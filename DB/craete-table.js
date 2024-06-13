require('dotenv').config({ path: '.env.development.local' });
const { v4: uuidv4 } = require('uuid');
const { sql } = require('@vercel/postgres');

async function execute() {
    const deleteTable = await sql`DROP TABLE antrian`;

    const createTable = await sql `
        CREATE TABLE IF NOT EXISTS antrian (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            nomer VARCHAR(50) NOT NULL,
            kepentingan VARCHAR(225) NOT NULL,
            antrian INT NOT NULL
        )
    `;
    console.log(createTable);
};

execute()