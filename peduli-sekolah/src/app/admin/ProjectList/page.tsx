import AdminSidebar from "@/app/components/AdminSidebar";
import AdminNavbar from "@/app/components/adminNavbar";
import Link from "next/link";

const PageAdminSchool = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex h-screen bg-slate-200">
        <AdminSidebar />

        <main className="flex-1 p-8 bg-slate-200">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold">Project List</h1>
            <i className="fas fa-bell text-blue-500 text-xl"></i>
          </header>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img
                src="https://placehold.co/60x60"
                alt="Project image"
                className="rounded-full w-14 h-14 mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  Kompor MLEDUG! - SMAN 35 JAKARTA
                </h2>
                <div className="text-gray-500">
                  <span>Donasi Terkumpul: Rp. 1.750.000</span>
                  <span className="ml-4">Target Donasi: Rp. 1.450.000</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">
              Kejadian tak terduga terjadi di SMAN 35 Jakarta pagi ini ketika
              sebuah kompor meledak di ruang praktik memasak. Insiden ini
              terjadi sekitar pukul 08:00 WIB, saat siswa sedang mengikuti
              pelajaran keterampilan memasak. Menurut keterangan saksi, ledakan
              tersebut terjadi saat siswa sedang mencoba menyalakan kompor. Gas
              tersendat pada pipa gas utama dan gas yang bocor di sekitar
              tabung. Beruntung, tidak ada korban jiwa dalam insiden ini
              meskipun beberapa siswa mengalami luka ringan akibat terjuhan saat
              berusaha keluar dari ruang praktik.
            </p>

            {/* Project Images */}
            <div className="flex space-x-2 mb-4">
              <img
                src="https://placehold.co/60x60"
                alt="Image 1"
                className="w-14 h-14 border-2 border-blue-500"
              />
              <img
                src="https://placehold.co/60x60"
                alt="Image 2"
                className="w-14 h-14"
              />
              <img
                src="https://placehold.co/60x60"
                alt="Image 3"
                className="w-14 h-14"
              />
              <img
                src="https://placehold.co/60x60"
                alt="Image 4"
                className="w-14 h-14"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Pin Post
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default PageAdminSchool;
