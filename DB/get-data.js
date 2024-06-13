require('dotenv').config({ path: '.env.development.local' });

const { sql } = require('@vercel/postgres');

async function execute() {
    const getData = await sql `
        SELECT * FROM antrian
    `;
    console.log(getData);
};

execute()