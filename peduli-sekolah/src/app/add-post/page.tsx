import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import CreatePost from "./action";

export default function PostForm({ initialData = {} }) {
  return (
    <div className="w-full min-h-screen bg-[#ECF0F1] py-12">
      <div className="container mx-auto">
        <form
          action={CreatePost}
          className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
            />
          </div>

          <div>
            <Label htmlFor="categoryId">Category ID</Label>
            <Input
              id="categoryId"
              name="categoryId"
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              name="tags"
            />
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="file"
            />
          </div>

          <div>
            <Label htmlFor="createdAt">Created At</Label>
            <Input
              type="datetime-local"
              id="createdAt"
              name="createdAt"
            />
          </div>

          <div>
            <Label htmlFor="updatedAt">Updated At</Label>
            <Input
              type="datetime-local"
              id="updatedAt"
              name="updatedAt"
            />
          </div>

          <div>
            <Label htmlFor="deadLineAt">Deadline At</Label>
            <Input
              type="datetime-local"
              id="deadLineAt"
              name="deadLineAt"
            />
          </div>

          <div>
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              name="meta_description"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Submit Post
          </Button>
        </form>
      </div>
    </div>
  );
}
