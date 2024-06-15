import { useEffect, useState } from "react"
import Navbar from "./component/Nav"
import Footer from "./component/Footer"
import { useRouter } from "next/router";

export default function InsertData() {
    
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const handleAdd = (event) => {
        event.preventDefault()
        setLoading(true)

        const name = event.target.name.value;
        const email = event.target.email.value;
        const nomer = event.target.nomer.value;
        const kepentingan = event.target.kepentingan.value;

        fetch(`/api/insertData`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                email: email,
                nomer: nomer,
                kepentingan: kepentingan
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
            if (data !== undefined) {
                router.push('/');
                router.reload('/');
            }
        })
        .catch((err) => {
            alert("Mengalami masalah", err.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div>
            <Navbar/>
            <div className="w-11/12 m-auto">
                <div>
                    <h1 className="text-3xl font-semibold text-center">Buku Antrian Tamu</h1>
                    <form onSubmit={handleAdd}>
                        <div>
                            <input
                                className="border border-slate-400 w-full px-2 py-2 rounded-md my-2"
                                name="name"
                                placeholder="Masukkan nama lengkap Anda"
                                required
                            />
                        </div>
                        <div>    
                            <input
                                className="border border-slate-400 w-full px-2 py-2 rounded-md my-2"
                                name="email"
                                placeholder="Masukkan Email"
                                required
                            />
                        </div>
                        <div>    
                            <input
                                className="border border-slate-400 w-full px-2 py-2 rounded-md my-2"
                                name="nomer"
                                placeholder="Masukkan nomer whatsapp"
                                required
                            />
                        </div>
                        <div>    
                            <textarea 
                                className="border border-slate-400 w-full px-2 py-2 rounded-md my-2 h-36" 
                                name="kepentingan"
                                placeholder="Masukkan kepentingan">
                            </textarea>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    router.push('/')
                                }}
                                className="bg-blue-500 text-white p-2 w-full rounded-md"
                                type="submit"
                                disabled={loading}
                                >
                            {loading ? 'Loading...' : 'Buat Nomor Antrian'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}