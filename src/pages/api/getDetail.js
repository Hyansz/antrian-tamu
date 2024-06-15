const { sql } = require("@vercel/postgres");

export default async function handler(req,res) {
    try {
        if(req.method !== "GET") {
            return res.status(405).json({message:"Method tidak diperbolehkan"})
        }

        const {antrian} = await req.query
        
        if (!antrian) {
            console.log("Mohon masukkan antrian");
            return res.status(400).json({ message: "Antrian tidak boleh kosong" })
        }

        const {rows} = await sql`SELECT * FROM antrian WHERE antrian = ${antrian}`

        res.status(200).json({ message:"Success", data:rows })
    } catch(error){
        console.log("Kamu menemukan masalah ", error)
        return res.status(500).json({ message:"Terjadi error " })
    }
}