

const loginAuth = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = `SELECT * from User where email='${email}'`;
    const userExist = await runConfig(query);

    if (userExist.length === 0) {
        return res
            .status(401)
            .json({ error: "Login Failed - User doesn't exists" });
    } else {
        const hashedPassword = userExist[0].password;
        const result = await bcrypt.compare(password, hashedPassword);
        if (result) {
            req.session.isAuth = true;
            return res
                .status(200)
                .json({ message: "Login Successful", user: userExist });
        } else {
            return res.status(401).json({ error: "Invalid Password" });
        }
    }
}

const registerAuth = async (req, res) => {
    const email = req.body.email;
    const userName = req.body.name;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    //checking if email is already present in db;
    let query = `SELECT * FROM User where email = '${email}'`;
    const userExist = await runConfig(query);
    console.log(userExist);
    if (userExist.length === 0) {
        // Store user details....will encrypt the password in future.
        query = `INSERT INTO User(name, email, password) VALUES ('${userName}', '${email}', '${secPass}')`;
        runConfig(query);
        return res.status(200).json({ message: "User created successfully" });
    } else {
        return res
            .status(400)
            .json({ error: "User with this email already exists" });
    }
}

const logoutAuth = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      } else return res.redirect("/login");
    });
  }

module.exports = {
    loginAuth,
    registerAuth,
    logoutAuth
}