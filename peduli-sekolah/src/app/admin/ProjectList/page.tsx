import AdminSidebar from "@/components/AdminSidebar";
import { getPostsList } from "./action";
import ImageModal from "@/components/imageModal";

const PageAdminSchool = async ({
  page = 1,
  category = "All",
  searchTerm = "",
}) => {
  const posts = await getPostsList(page, category, searchTerm);

  return (
    <>
      <div className="w-full min-h-screen bg-[#2C3E50]">
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="w-9/12 mx-auto mt-2 p-5 bg-[#2C3E50]">
            {posts.map((post, index) => (
              <div
                key={index}
                className="border shadow-lg rounded-xl p-5 bg-white mb-5"
              >
                <div className="flex">
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h2 className="font-bold text-left my-5">{post.title}</h2>
                      <div className="hidden sm:block text-right">
                        <h2>Donasi Terkumpul : Rp. {post.amount}</h2>
                        <h2>
                          Target Donasi : Rp.{" "}
                          {typeof post.target_amount === "number"
                            ? post.target_amount.toLocaleString()
                            : "N/A"}
                        </h2>
                      </div>
                    </div>
                    <hr className="hidden sm:block h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <p className="my-3 text-sm">{post.content}</p>

                    {/* Display status */}
                    <p className="text-gray-500 text-sm mb-2">
                      Status: {post.status}
                    </p>

                    {/* Display tags */}
                    <div className="text-gray-500 text-sm mb-2">
                      Tags: {post.tags.join(", ")}
                    </div>

                    {/* Display meta description */}
                    {post.meta_description && (
                      <p className="italic text-gray-400 mb-2">
                        {post.meta_description}
                      </p>
                    )}

                    {/* Display images */}
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
