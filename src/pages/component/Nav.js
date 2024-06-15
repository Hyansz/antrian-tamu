import { useRouter } from "next/router"

export default function Navbar() {
    const router = useRouter()
    return (
        <div className="w-11/12 m-auto flex items-center justify-between my-4">
            <div>
                <h1>Tamu PPQITA</h1>
            </div>
            <div className="flex items-center gap-4">
                <button 
                    className="border-2 border-white px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold"
                    onClick={() => {
                        router.push('/add-data')
                    }}>Tambah Antri
                </button>
                <button 
                    className="border-2 border-white px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold"
                    onClick={() => {
                        router.push('/')
                    }}>Daftar Antrian
                </button>
                <button 
                    className="border-2 border-white px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold"
                    onClick={() => {
                        router.push('/not-found')
                    }}>Not Found Page
                </button>
            </div>
        </div>
    )
}