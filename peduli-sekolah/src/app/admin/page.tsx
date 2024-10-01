import AdminNavbar from "../components/adminNavbar";
import Link from "next/link";

const PageAdmin = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-slate-200">
        <AdminNavbar />
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-1/5 bg-white p-4 relative">
            <div className="flex items-center mb-8">
              <img
                src="https://placehold.co/40x40"
                alt="User profile"
                className="rounded-full w-10 h-10 mr-2"
              />
              <span className="font-semibold">PeduliSekolah.id</span>
            </div>
            <nav>
              <ul>
                <li className="mb-4">
                  <Link
                    href="/admin/SchoolVerify"
                    className="flex items-center text-gray-700 hover:text-blue-500"
                  >
                    <i className="fas fa-check-circle mr-2"></i> School Verify
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="/admin/SchoolList"
                    className="flex items-center text-gray-700 hover:text-blue-500"
                  >
                    <i className="fas fa-list-alt mr-2"></i> School List
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="/admin/ProjectList"
                    className="flex items-center text-blue-500"
                  >
                    <i className="fas fa-tasks mr-2"></i> Projects List
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="/admin/PostVerify"
                    className="flex items-center text-gray-700 hover:text-blue-500"
                  >
                    <i className="fas fa-check-square mr-2"></i> Post Verify
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center text-gray-700 hover:text-blue-500"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="absolute bottom-4 left-4">
              <span className="text-gray-500">PeduliSekolah</span>
              <span className="text-gray-400 text-sm">Version: 1.0.0.11</span>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 bg-gray-50">
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
                pelajaran keterampilan memasak. Menurut keterangan saksi,
                ledakan tersebut terjadi saat siswa sedang mencoba menyalakan
                kompor. Gas tersendat pada pipa gas utama dan gas yang bocor di
                sekitar tabung. Beruntung, tidak ada korban jiwa dalam insiden
                ini meskipun beberapa siswa mengalami luka ringan akibat
                terjuhan saat berusaha keluar dari ruang praktik.
              </p>
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
      </div>
    </>
  );
};

export default PageAdmin;
