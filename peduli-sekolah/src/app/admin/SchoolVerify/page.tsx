import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/adminNavbar";

const PageAdminSchool = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-slate-200">
        <AdminNavbar />
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="w-9/12 border bg-white rounded-xl m-5 p-5">
            <div className="border shadow-lg rounded-xl p-5">
              <div className="flex">
                <img
                  src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww"
                  alt="User avatar"
                  className="rounded-full w-20 h-20 m-5"
                />
                <div className="w-full">
                  <div className="flex justify-between">
                    <h2 className="font-bold text-left my-5">
                      SMAN 35 JAKARTA
                    </h2>
                    <div className="hidden sm:block text-right">
                      <p className="text-xs">Pendaftar: Sri Astuti</p>
                      <p className="text-xs">No. Handphone: xxx</p>
                    </div>
                  </div>
                  <hr className="hidden sm:block h-px bg-gray-200 border-0 dark:bg-gray-700" />
                  <p className="my-3 text-sm">
                    Halo teman-teman! Sekolah kami saat ini menghadapi masalah
                    serius dengan genteng yang bocor. Untuk memastikan anak-anak
                    tetap dapat belajar dengan nyaman, kami memerlukan bantuan
                    dari Anda. Mari bersama-sama meringankan beban ini dengan
                    memberikan sumbangan. Setiap kontribusi, sekecil apa pun,
                    sangat berarti bagi kami. Terima kasih atas dukungan Anda!
                  </p>
                  <div className="flex space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
                      alt="School photo 1"
                      className="w-24 h-24 rounded-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
                      alt="School photo 2"
                      className="w-24 h-24 rounded-lg"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
                      alt="School photo 3"
                      className="w-24 h-24 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end mt-5 space-x-2">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Invalidate
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAdminSchool;
