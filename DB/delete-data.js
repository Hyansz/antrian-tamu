require('dotenv').config({ path: '.env.development.local' });

const { sql } = require('@vercel/postgres');

async function execute() {
    const getData = await sql `
        DELETE FROM antrian WHERE id = '023da08b-3f96-414d-a570-f0d501a2d989'
    `;
    console.log(getData);
};

execute()