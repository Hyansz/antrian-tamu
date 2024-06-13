require('dotenv').config({ path: '.env.development.local' });
const { sql } = require('@vercel/postgres');
const { v4: uuidv4 } = require('uuid');

async function insertData(name, email, nomer, kepentingan) {
    try {
        // Menghitung total antrian saat ini
        const { rows } = await sql`SELECT COUNT(*)::int AS count FROM antrian`;
        const totalAntrian = rows[0].count + 1;

        // Menyisipkan data baru dengan antrian yang ditambah 1
        const result = await sql`
            INSERT INTO antrian (id, name, email, nomer, kepentingan, antrian)
            VALUES (${uuidv4()}, ${name}, ${email}, ${nomer}, ${kepentingan}, ${totalAntrian})
        `;
        console.log(result);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

insertData('John Doe', 'john@example.com', '1234567890', 'Business Meeting');
