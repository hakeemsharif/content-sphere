"use client"

import React, { useEffect, useState } from 'react'
import style from "./update.module.scss"
import ContentForm from '@/app/components/blog/content'
import DetailsForm from '@/app/components/blog/details'
import { FormProvider } from "react-hook-form";
import { useParams } from 'next/navigation'
import useBlogUpdate from '@/hooks/useBlogUpdate'

export default function UpdateBlog() {
  const { id } = useParams()
  const { 
    onSubmit, 
    content, 
    setContent, 
    loading, 
    formError, 
    methods, 
    handleImageSelect, 
    imagePreview, 
    uploadingImage,
    fetchCurrentBlog,
    setCurrentImageUrl
  } = useBlogUpdate(id);
  
  const [previewImage, setPreviewImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);

  // const handleImageSelect = (file) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/blogdetail/${id}`)

      if (!response.ok) {
        throw new Error('Failed to fetch blog data')
      }
      
      // AI assist
      const data = await response.json()
      if (data) {
        // Set the form values with the data from the database
        methods.reset({
          title: data.title,
          content: data.content,
          slug: data.slug,
          excerpt: data.excerpt,
          category: data.category,
          author: data.author,
          status: data.status,
          image: data.image
        });
        
        if (setContent) {
          setContent(data.content || '');
        }

        if (setPreviewImage) {
          setPreviewImage(data.image || '');
        }
        
        setCurrentImageUrl(data.image || null);
        
      }
    } catch (error) {
      console.error("Error fetching blog data:", error)
    }
  }
  
  useEffect(() => {
    if (id) {
      fetchData()
      fetchCurrentBlog()
    }
  }, [id, methods, setContent])
  
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={style.container}>
            <div className={style.content}>
              <ContentForm 
                content={content} 
                setContent={setContent} />
            </div>
            <div className={style.details}>
              <DetailsForm 
                loading={loading} 
                formError={formError} 
                mode="update" 
                handleImageSelect={handleImageSelect} 
                imagePreview={imagePreview} 
                uploadingImage={uploadingImage}
                previewImage={previewImage} />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

// AI Assist