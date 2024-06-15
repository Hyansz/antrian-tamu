import Navbar from "./component/Nav";
import Footer from "./component/Footer";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function NotFound() {
    const router = useRouter();

    return (
        <div>
            <Navbar />
            <div className={`w-11/12 m-auto ${inter.className} mt-10`}>
                <div className="p-20 2xl:my-[165px] text-xl w-full flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-9xl mb-5">404</h1>
                        <p className="text-sm mb-5">Mohon maaf halaman ini belum tersedia</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
