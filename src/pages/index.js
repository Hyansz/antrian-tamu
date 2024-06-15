import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "./component/Nav";
import Footer from "./component/Footer";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const router = useRouter();
  const [showData, setShowData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  useEffect(() => {
    fetch(`/api/getData`)
      .then((res) => res.json())
      .then((data) => {
        let sortById = data.data;
        sortById = sortById.sort((a, b) => a.id - b.id);
        setShowData(sortById);
      });
  }, []);

  const handleDetail = (antrian) => {
    fetch(`/api/getDetail?antrian=${antrian}`)
      .then((res) => res.json())
      .then((data) => {
        setDataDetail(data.data);
        setShowModal(true);
      })
      .catch((err) => {
        console.error("Error fetching detail:", err);
        alert("Gagal mengambil detail antrian.");
      });
  };

  return (
    <div>
      <Navbar />
      <div className={`w-11/12 m-auto ${inter.className} mt-10`}>
        <div className="w-full">
          <div className="flex text-center">
            <p className="border-2 border-black w-1/4 p-2">Nama Lengkap</p>
            <p className="border-2 border-black w-1/4 p-2">Kepentingan</p>
            <p className="border-2 border-black w-1/4 p-2">Antrean</p>
            <p className="border-2 border-black w-1/4 p-2">Status</p>
          </div>
        </div>
        {showData && showData.length === 0 && <h1 className="my-7">Data Kosong</h1>}
        {showData === undefined && <h1>Loading....</h1>}
        {showData && showData.map((data, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="w-1/4 text-left border border-black p-3">
              {data.name}
            </div>
            <div className="w-1/4 text-left border border-black p-3">
              {data.kepentingan}
            </div>
            <div className="w-1/4 text-center border border-black p-3">
              {data.antrian}
            </div>
            <div className="w-1/4 text-center border border-black p-2">
              <button
                onClick={() => handleDetail(data.antrian)}
                className="border-2 border-black px-4 py-1 rounded-full font-semibold text-sm"
              >
                Detail Antrian
              </button>
            </div>
          </div>
        ))}
        {showModal && dataDetail && dataDetail.map((data, index) => (
          <div key={index} className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-5/12 border-2 print:w-full">
              <h2 className="text-lg text-center font-semibold mb-4">Detail Antrian</h2>
              <div className="my-4 flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="w-1/2 text-left">
                    <p>ID Tamu</p>
                  </div>
                  <div className="w-1/2 flex">
                    <span className="pr-2"> :</span>
                    <div className="text-left">
                      {data.id}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-1/2 text-left">
                    <p>Nama</p>
                  </div>
                  <div className="w-1/2 flex">
                    <span className="pr-2"> :</span>
                    <div className="text-left">
                      {data.name}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-1/2 text-left">
                    <p>Email</p>
                  </div>
                  <div className="w-1/2 flex">
                    <span className="pr-2"> :</span>
                    <div className="text-left">
                      {data.email}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-1/2 text-left">
                    <p>No Whatsapp</p>
                  </div>
                  <div className="w-1/2 flex">
                    <span className="pr-2"> :</span>
                    <div className="text-left">
                      {data.nomer}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-1/2 text-left">
                    <p>Keperluan</p>
                  </div>
                  <div className="w-1/2 flex">
                    <span className="pr-2"> :</span>
                    <div className="text-left">
                      {data.kepentingan}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-1/2 text-left">
                    <p>Nomor Antrian</p>
                  </div>
                  <div className="w-1/2 flex">
                    <span className="pr-2"> :</span>
                    <div className="text-left">
                      {data.antrian}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    try {
                      window.print();
                      setShowModal(false);
                    } catch (error) {
                      console.error("Error:", error.message);
                      alert(error.message);
                    }
                  }}
                  className="border border-black rounded-lg px-4 py-2 bg-black text-white print:hidden"
                >
                  Cetak Antrian
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="border border-gray-300 rounded-lg px-4 py-2 mr-2 print:hidden"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
