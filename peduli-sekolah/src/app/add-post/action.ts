"use server";

const CreatePost = (formData: FormData) => {
  const title = formData.get("title");
  const content = formData.get("content");
};

export default CreatePost;
