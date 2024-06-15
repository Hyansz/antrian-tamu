const { sql } = require("@vercel/postgres");
const { v4: uuidv4 } = require('uuid');

async function insertData(req,res) {
    try {
        
        if(req.method !== "POST") {
            return res.status(405).json({message:"Method tidak diperbolehkan"})
        }

        const {name, email, nomer, kepentingan} = req.body

        // if(!name && !email && !nomer && !kepentingan) {
        //     return res.status(400).json({message:"Data data harus diisi"})
        // }

        // if(!name) {
        //     return res.status(400).json({message:"Nama tidak boleh kosong"})
        // }

        // if(!email) {
        //     return res.status(400).json({message:"Email tidak boleh kosong"})
        // }

        // if(!email.endsWith('@gmail.com')) {
        //     return res.status(400).json({message:"Email harus menggunakan '@gmail.com'"})
        // }

        // if(!nomer) {
        //     return res.status(400).json({message:"Nomor tidak boleh kosong"})
        // }

        // if(!kepentingan) {
        //     return res.status(400).json({message:"Kepentingan tidak boleh kosong"})
        // }
        
        const { rows } = await sql`SELECT COUNT(*)::int AS count FROM antrian`;
        const totalAntrian = rows[0].count + 1;

        const result = await sql`
            INSERT INTO antrian (id, name, email, nomer, kepentingan, antrian)
            VALUES (${uuidv4()}, ${name}, ${email}, ${nomer}, ${kepentingan}, ${totalAntrian})
        `

        res.status(200).json({message:"Success", data:result})
    } catch(e){
        console.log("ADA ERROR ", e)
        return res.status(500).json({message:"Terjadi error,"})
    }
}

export default (insertData)