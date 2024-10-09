import AdminSidebar from "@/components/AdminSidebar";
import { getAdminPostList } from "./action";
import AdminButtonClient from "@/components/AdminButtonVerifyClient";

const PostPage = async ({ page = 1 }) => {
  const posts = await getAdminPostList(page);
  const modifiedPosts = [...posts].map((post) => ({
    ...post,
    _id: post._id.toString(),
  }));

  return (
    <>
      <div>
        <div className="flex min-h-screen bg-[#2C3E50]">
          <AdminSidebar />
          <div className="w-9/12 mx-auto mt-2 p-5 bg-[#2C3E50]">
            {modifiedPosts.map((post, index) => (
              <div
                key={post._id}
                className="border shadow-lg rounded-xl p-5 bg-white mb-5"
              >
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
                        <p className="text-xs">
                          Target Donation: Rp.{" "}
                          {post.target_amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <hr className="hidden sm:block h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <p className="my-3 text-sm">{post.content}</p>
                    <div className="flex space-x-4">
                      {post.imageUrl.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`School photo ${index + 1}`}
                          className="w-24 h-24 rounded-lg"
                        />
                      ))}
                    </div>
                    <AdminButtonClient id={post._id} />
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

export default PostPage;
