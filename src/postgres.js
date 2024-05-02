const { Client } = require('pg');

(async () => {
    const connectionString = 'postgresql://dev:server@postgres:5432/postgres'
    const client = new Client(connectionString);
    await client.connect();
    await client.query('DROP TABLE IF EXISTS employee;');
    await client.query('CREATE TABLE employee (name TEXT,age INT);');
    await client.query("INSERT INTO employee VALUES ('John Doe', 34);");
    await client.query("INSERT INTO employee VALUES ('Jack Smith', 42);");

    const data = await client.query("SELECT * FROM employee");
    for (let r of data.rows) {
        console.log(`${r.name} ${r.age}`)
    }

    await client.end();
})().catch(console.error);