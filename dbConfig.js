import mysql from 'mysql2';

export const runConfig = (query) => {
    return new Promise((resolve, reject) => {
        let queryResult;

        // Create a connection
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Anuj@8296',
            database: 'springjdbc'
        });

        // Connect to the database
        connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err.stack);
                reject(err);
                return;
            }

            console.log('Connected to MySQL as id', connection.threadId);
        });

        // Execute the query
        connection.query(query, (err, results, fields) => {
            if (err) {
                console.error('Error executing query:', err.stack);
                reject(err);
                return;
            }

            console.log('Query results:', results);
            queryResult = results;
            resolve(queryResult);
        });

        // Close the connection
        connection.end((err) => {
            if (err) {
                console.error('Error closing MySQL connection:', err.stack);
                reject(err);
                return;
            }

            console.log('MySQL connection closed.');
        });
    });
};
