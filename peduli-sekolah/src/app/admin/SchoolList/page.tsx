import AdminSidebar from "@/components/AdminSidebar";
import { getSchoolList } from "./action";

const PageAdminSchoolList = async () => {
  const schoolData = await getSchoolList();
  const modifiedData = [...schoolData].map((school) => {
    return {
      ...school,
      _id: school._id.toString(),
      userId: school.userId.toString(),
    };
  });

  return (
    <>
      <div className="w-full min-h-screen ">
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="w-9/12  bg-white  mx-auto mt-2 p-5">
            {modifiedData.map((school, index) => (
              <div key={index} className="border shadow-lg rounded-xl p-5 mb-5">
                <div className="flex">
                  <img
                    src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww"
                    alt="School"
                    className="rounded-full w-20 h-20 m-5 hidden sm:block"
                  />
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h2 className="font-bold text-left my-5">
                        {school.name}
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
                      Contact Us:{" "}
                      <a href="" className="text-blue-500">
                        {school.phoneNumber}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAdminSchoolList;
