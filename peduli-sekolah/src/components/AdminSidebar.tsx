import Link from "next/link";

const AdminSidebar = () => {
  return (
    <>
      <div className="w-6/12 sm:w-3/12 p-5">
        <div className="border bg-white rounded-xl">
          <Link href="/admin/SchoolVerify">
            <h1 className="text-center p-3">School Verify</h1>
          </Link>
          <Link href="/admin/SchoolList">
            <h1 className="text-center p-3">School List</h1>
          </Link>
          <Link href="/admin/ProjectList">
            <h1 className="text-center p-3">Post List</h1>
          </Link>
          <Link href="/admin/PostVerify">
            <h1 className="text-center p-3">Post Verify</h1>
          </Link>
          <h1 className="text-center p-3 cursor-pointer">Logout</h1>
        </div>
      </div>
    </>
  );
};
export default AdminSidebar;
