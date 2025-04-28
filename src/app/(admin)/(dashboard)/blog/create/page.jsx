"use client"

import React from 'react'
import style from "./create.module.scss"
import ContentForm from '@/app/components/blog/content'
import DetailsForm from '@/app/components/blog/details'
import { FormProvider } from "react-hook-form";
import useBlogSubmit from '@/hooks/useBlogSubmit'

export default function CreateBlog() {
  
  const { onSubmit, content, setContent, loading, formError, methods, handleImageSelect, imagePreview, uploadingImage } = useBlogSubmit();

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={style.container}>
              <div className={style.content}>
                  <ContentForm content={content} setContent={setContent}/>
              </div>

              <div className={style.details}>
                <DetailsForm 
                loading={loading} 
                formError={formError} 
                mode="create" 
                handleImageSelect={handleImageSelect} 
                imagePreview={imagePreview} 
                uploadingImage={uploadingImage} />
              </div>
          </div>
        </form>
      </FormProvider>
    </>
  )
}