import AdminSidebar from "@/components/AdminSidebar";
import SchoolListClient from "@/components/PageSchoolList"; // Import client component
import { getSchoolList } from "./action";
import { getUsers } from "@/db/models/user";

const PageAdminSchoolList = async () => {
  const schoolData = await getSchoolList();
  const modifiedData = [...schoolData].map((school) => ({
    ...school,
    _id: school._id.toString(),
    userId: school.userId.toString(),
  }));
  const userData = await getUsers();
  const modifiedUsers = [...userData].map((user) => ({
    ...user,
    _id: user._id.toString(),
  }));

  return (
    <div className="w-full min-h-screen bg-[#2C3E50]">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="w-9/12 bg-[#2C3E50] mx-auto mt-2 p-5">
          {/* Pass the data to the client component */}
          <SchoolListClient schools={modifiedData} users={modifiedUsers} />
        </div>
      </div>
    </div>
  );
};

export default PageAdminSchoolList;
