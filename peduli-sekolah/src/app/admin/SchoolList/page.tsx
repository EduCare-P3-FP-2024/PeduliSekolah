import AdminSidebar from "@/components/AdminSidebar";

const PageAdminSchoolList = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-slate-200">
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="w-9/12 border bg-white rounded-xl mx-auto mt-2 p-5">
            <div className="border shadow-lg rounded-xl p-5">
              <div className="flex">
                <img
                  src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww"
                  alt="School"
                  className="rounded-full w-20 h-20 m-5 hidden sm:block"
                />
                <div className="w-full">
                  <div className="flex justify-between">
                    <h2 className="font-bold text-left my-5">
                      SMAN 35 JAKARTA
                    </h2>
                    <div className="text-right">
                      <p className="text-xs">Member since 2019</p>
                      <p className="text-xs font-bold">
                        Total Dana Dikumpulkan: Rp. 1.450.000
                      </p>
                    </div>
                  </div>
                  <hr className="hidden sm:block h-px bg-gray-200 border-0 dark:bg-gray-700" />
                  <p className="my-3 text-sm">
                    Cerdas, Berkarakter, Berakhlak Mulia. <br />
                    Jalan Mutiara no. 7, Bendungan Hilir Jakarta Pusat <br />
                    Contact Us:{" "}
                    <a
                      href="tel:+0215709328"
                      className="text-blue-500"
                    >
                      (021) 5709328
                    </a>{" "}
                    <br />
                    Total Post: 2
                  </p>
                  <div className="flex justify-end mt-5">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Ban This School
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

export default PageAdminSchoolList;
