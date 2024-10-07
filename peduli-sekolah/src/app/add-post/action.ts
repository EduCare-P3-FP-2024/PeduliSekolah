"use server";

const CreatePost = (formData: FormData) => {
  const title = formData.get("title");
  const content = formData.get("content");
  const slug = formData.get("slug");
  const Category = formData.get("Category");
  const tags = formData.get("tags");
  const file = formData.get("file");
  const deadline = formData.get("deadLineAt");
  const metaDescription = formData.get("meta_description");

  const postInput = {
    title,
    content,
    slug,
    Category,
    tags,
    file,
    deadline,
    metaDescription,
  };

  console.log(postInput);
};

export { CreatePost };
