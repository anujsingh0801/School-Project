import express from "express";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import apiRoutes from "./routes/apiRoute.js";

const app = express();
const port = 3003;
const serverIP = "192.168.0.109";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const MySQLStore = MySQLStoreFactory(session);

const dbOptions = {
  host: "localhost",
  user: "root",
  password: "Anuj@8296",
  database: "schooldb",
};

const sessionStore = new MySQLStore(dbOptions);

app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 3600000, // 1 hour in milliseconds
    },
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(port, serverIP, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
