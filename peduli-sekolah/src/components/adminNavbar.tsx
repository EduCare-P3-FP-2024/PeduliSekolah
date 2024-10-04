import React from "react";

const AdminNavbar = () => {
  return (
    <>
      <div className="w-full h-[64px] bg-white rounded-b-lg flex px-5 py-10">
        <div className="flex justify-center items-center gap-2">
          <img
            src={
              "https://images.unsplash.com/photo-1530631673369-bc20fdb32288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww"
            }
            alt=""
            className="rounded-full w-12 h-12"
          />
          <h2 className="font-semibold text-2xl">PeduliSekolah.id</h2>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
