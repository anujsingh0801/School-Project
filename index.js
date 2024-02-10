import express from 'express';
import session from 'express-session';
import {runConfig} from "./dbConfig.js";
import MySQLStoreFactory from 'express-mysql-session';
import bcrypt from 'bcryptjs';
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MySQLStore = MySQLStoreFactory(session);

const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'Anuj@8296',
    database: 'schoolDB'
};

const sessionStore = new MySQLStore(dbOptions);

app.use(session({
    secret : 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 3600000, // 1 hour in milliseconds
    },
}));

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = `SELECT * from User where email='${email}'`;
    const userExist = await runConfig(query);

    if(userExist.length === 0) {
        return res.status(401).json({error: "Login Failed - User doesn't exists"});
    } else {
        const hashedPassword = userExist[0].password;
        const result = await bcrypt.compare(password, hashedPassword);
        if(result) {
            req.session.isAuth = true;
            return res.status(200).json({message: "Login Successful", user : userExist});
        } else {
            return res.status(401).json({error: "Invalid Password"});
        }
    }
});

app.post('/register', async (req, res) => {
    const email = req.body.email;
    const userName = req.body.name;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    //checking if email is already present in db;
    let query = `SELECT * FROM User where email = '${email}'`;
    const userExist = await runConfig(query);
    console.log(userExist);
    if(userExist.length === 0) {
        // Store user details....will encrypt the password in future.
        query = `INSERT INTO User(name, email, password) VALUES ('${userName}', '${email}', '${secPass}')`;
        runConfig(query);
        return res.status(200).json({message: "User created successfully"});
    } else {
        return res.status(400).json({error: "User with this email already exists"});
    }
})

app.get('/', (req, res) => {
    return res.send("Home page for testing")
})

app.get('/getAllStudent', async (req, res) => {
    try {
        if(!req.session.isAuth) {
            return res.status(401).send("Authentication Failed!!!");
        }
        const query = "SELECT * FROM Student";
        let result = await runConfig(query);
        return res.send(result);
        console.log(result);
    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({error: "Internal server error"});
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            throw err;
        } else
            return res.redirect('/');
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});