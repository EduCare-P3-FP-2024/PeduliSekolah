import AdminSidebar from "@/components/AdminSidebar";
import { getPostsList } from "./action";
import ImageModal from "@/components/imageModal";

const PageAdminSchool = async () => {
  const posts = await getPostsList();

  return (
    <>
      <div className="w-full min-h-screen bg-[#2C3E50]">
        <div className="flex min-h-screen ">
          <AdminSidebar />
          <div className="w-9/12  bg-white mx-auto mt-2 p-5 bg-[#2C3E50]">
            {posts.map((post, index) => (
              <div key={index} className="border shadow-lg rounded-xl p-5">
                <div className="flex">
                  <img
                    src="https://images.unsplash.com/photo-1530631673369-bc20fdb32288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BsYXNofGVufDB8fDB8fHww"
                    alt="User avatar"
                    className="rounded-full w-20 h-20 m-5 hidden sm:block"
                  />
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h2 className="font-bold text-left my-5">{post.title}</h2>
                      <div className="hidden sm:block text-right">
                        <h2>Donasi Terkumpul : Rp. 1.500.000</h2>
                        <h2>Target Donasi : Rp. 1.450.000</h2>
                      </div>
                    </div>
                    <hr className="hidden sm:block h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <p className="my-3 text-sm">{post.content}</p>
                    <div className="flex space-x-4">
                      {post.imageUrl.map((image, index) => (
                        <ImageModal image={image} key={index} />
                      ))}
                    </div>
                    <div className="flex justify-end mt-5 space-x-2">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                        Pin Post
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        Delete
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

export default PageAdminSchool;
