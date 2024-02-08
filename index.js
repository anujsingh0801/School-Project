import express from 'express';
import session from 'express-session';
import {runConfig} from "./dbConfig.js";
import MySQLStoreFactory from 'express-mysql-session';
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

    const query = `SELECT * from User where password='${password}'`;
    const userExist = await runConfig(query);

    if(userExist.length === 0) {
        return res.send("Login Failed !!!");
    } else {
        req.session.isAuth = true;
        return res.send("Login Successful !!!");
    }
});

app.post('/register', async (req, res) => {
    const email = req.body.email;
    const userName = req.body.name;
    const password = req.body.password;

    //checking if email is already present in db;
    let query = `SELECT * FROM User where email = '${email}'`;
    const userExist = await runConfig(query);
    console.log(userExist);
    if(userExist.length === 0) {
        // Store user details....will encrypt the password in future.
        query = `INSERT INTO User(name, email, password) VALUES ('${userName}', '${email}', '${password}')`;
        runConfig(query);
        return res.send("User Registered Successfully!!");
    } else {
        return res.send("User with this email already exists");
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
        return res.status(500).send('Internal Server Error');
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