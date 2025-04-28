import { createClient } from "@/utils/supabase/client";

export default function useDeleteBlog(data, setData) {
  const supabase = createClient();

  const handleData = (id) => {
    const updatedData = data.filter(sm => sm.id !== id)
    setData(updatedData);
  }

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Delete error:", error);
      return;
    }

    if (data) {
      console.log("Deleted blog:", data);
      handleData(id)
    }
  };

  return { handleDelete };
}