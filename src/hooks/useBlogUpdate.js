import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function useBlogUpdate(id) {
  const router = useRouter();
  const supabase = createClient();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  // Image
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  const schema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    excerpt: z.string().min(1),
    category: z.string().min(1),
    author: z.string().min(1),
    status: z.string().default("draft"),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const handleImageSelect = (file) => {
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
 
  const uploadImage = async () => {
    if (!imageFile) return null;
   
    setUploadingImage(true);
   
    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
     
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
     
      const data = await response.json();
     
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (e) => {
    setLoading(true);
    try {
      // First upload the image if one was selected
      let imageUrl = currentImageUrl; // Default to the current image URL
      
      if (imageFile) {
        const newImageUrl = await uploadImage();
        if (newImageUrl) {
          imageUrl = newImageUrl;
        }
      }

      const updateData = {
        title: e.title,
        content: content,
        slug: e.slug,
        excerpt: e.excerpt,
        category: e.category,
        author: e.author,
        status: e.status,
      };

      // Only include image field if we have an image URL to use
      if (imageUrl) {
        updateData.image = imageUrl;
      }

      const { data, error } = await supabase
        .from("blogs")
        .update([updateData])
        .eq('id', id)
        .select();

      if (error) {
        setFormError("Error saving to database: " + error.message);
      } else {
        setFormError(null);
        methods.reset();
        setContent("");
        router.push("/blog");
      }
    } catch (err) {
      console.error(err);
      setFormError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch current blog data including the image URL
  const fetchCurrentBlog = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching blog:", error);
        return;
      }

      if (data) {
        // Save the current image URL
        setCurrentImageUrl(data.image);
        
        // If there's an image, set it for preview
        if (data.image) {
          setImagePreview(data.image);
        }
      }
    } catch (error) {
      console.error("Error in fetchCurrentBlog:", error);
    }
  };

  return {
    onSubmit,
    content,
    setContent,
    loading,
    setLoading,
    formError,
    methods,
    handleImageSelect,
    imagePreview,
    uploadingImage,
    fetchCurrentBlog,
    setCurrentImageUrl
  };
}