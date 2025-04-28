import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function useBlogSubmit() {
  
  const router = useRouter();
  const supabase = createClient();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [generatedSlug, setGeneratedSlug] = useState('');

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

    // I went too deep with the Image and Slug
    // Watch the title field to generate the slug in real-time
    const title = methods.watch('title');

    // Generate slug from title
    useEffect(() => {
      if (title) {
        const newSlug = title
          .toLowerCase()
          .replace(/\s+/g, '-')     
          .replace(/[^\w\-]+/g, '')    
          .replace(/\-\-+/g, '-')      
          .replace(/^-+/, '')         
          .replace(/-+$/, '');
        
        setGeneratedSlug(newSlug);
        methods.setValue('slug', newSlug);
      } else {
        setGeneratedSlug('');
        methods.setValue('slug', '');
      }
    }, [title, methods]);

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
      let featuredImageUrl = null;
      if (imageFile) {
        featuredImageUrl = await uploadImage();
      }

      // Then insert the blog post with the image URL
      const { data, error } = await supabase
        .from("blogs")
        .insert([
          {
            title: e.title,
            content: content,
            slug: e.slug,
            excerpt: e.excerpt,
            category: e.category,
            author: e.author,
            status: e.status,
            image: featuredImageUrl,
          },
        ])
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

  return { onSubmit, content, setContent, loading, setLoading, formError, methods, handleImageSelect, imagePreview, uploadingImage };
}

// With AI Assist
// YT REF with AI