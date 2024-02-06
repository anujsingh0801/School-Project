import express from 'express';
const app = express();
const port = 3000;
// const runConfig = require("./dbConfig");

import {runConfig} from "./dbConfig.js";

app.get('/getAllStudent', async (req, res) => {
    try {
        const query = "SELECT * FROM your_table";
        let result = await runConfig(query);
        res.send(result);
        console.log(result);
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});