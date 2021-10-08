const express = require('express')

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)


const createTable = `CREATE TABLE IF NOT EXISTS people (
                        id int(11) NOT NULL auto_increment,
                        name varchar(250),
                        PRIMARY KEY  (id)
                    )`;

connection.query(createTable)

const ramdom = Math.floor(Math.random() * 1000) + 1;

const name = 'Bruno Magro ' + String(ramdom)

const sql = `INSERT INTO people (name) VALUES ('${name}')`
connection.query(sql)

let response = '<h1>Full Cycle Rocks!</h1>';

const allNames = `SELECT name FROM people;`
connection.query(allNames, function (err, result, fields) {
        if (err) {
            throw err;
        } else {
            result.map(returnQuery => {
                response = response + '<br>' + String(returnQuery.name )
            })
        }
    }
);

connection.end()

app.get('/', (req, res) => {
    return res.send(response)
})

app.listen(port, () => {
    console.log('Server is up !')
})
