import Link from "next/link";

const AdminNavbar = () => {
  return (
    <>
      <div className="w-full h-[64px] bg-white rounded-b-lg flex justify-between p-2">
        <div className="flex justify-center items-center gap-2">
          <img
            src={
              "https://images.unsplash.com/photo-1530631673369-bc20fdb32288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww"
            }
            alt=""
            className="rounded-full w-12 h-12 hidden sm:block"
          />
          <h2 className="font-semibold text-2xl">PeduliSekolah.id</h2>
        </div>
        <div>
          {" "}
          <div className="dropdown dropdown-end sm:hidden">
            <div
              tabIndex={0}
              role="button"
              className=" m-1"
            >
              <button className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/admin/SchoolVerify">
                  <h1 className="text-center p-3">School Verify</h1>
                </Link>
              </li>
              <li>
                <Link href="/admin/SchoolList">
                  <h1 className="text-center p-3">School List</h1>
                </Link>
              </li>
              <li>
                <Link href="/admin/ProjectList">
                  <h1 className="text-center p-3">Post List</h1>
                </Link>
              </li>
              <li>
                <Link href="/admin/PostVerify">
                  <h1 className="text-center p-3">Post Verify</h1>
                </Link>
              </li>
              <li>
                <h1 className="text-center px-7 py-4">Logout</h1>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
