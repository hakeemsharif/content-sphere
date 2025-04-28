"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "./details.module.scss";
import PreviewImage from "../preview";
import { useFormContext } from "react-hook-form"

export default function DetailsForm({ loading, formError, mode = "create", handleImageSelect, imagePreview, uploadingImage, previewImage }) {

  const [authors, setAuthors] = useState([]);
  const [category, setCategory] = useState([]);
  const { register, formState: { errors } } = useFormContext()
  const isUpdate = mode === "update"
  
  const fetchAuthor = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/authors");
      const data = await response.json()
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching categry data:", error)
    }
  }

  const fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/category");
      const data = await response.json()
      setCategory(data);
    } catch (error) {
      console.error("Error fetching categry data:", error)
    }
  }

  useEffect(() => {
    fetchAuthor();
    fetchCategory();
  }, []);

  return (
    <div className={style.container}>
        <label className={style.label}>
          <small>Featured image</small>
        </label>
        <PreviewImage onImageSelect={handleImageSelect} imagePreview={imagePreview} uploadingImage={uploadingImage} previewImage={previewImage}/>
        <label className={style.label}><small>Slug</small></label>
        <input className={style.input} type="text"  {...register("slug")} disabled/>
        <label className={style.label}><small>Excerpt</small></label>
        <input className={style.input} type="text"  {...register("excerpt")}/>
        <label className={style.label}><small>Category</small></label>
        {/* <input className={style.input} type="text"  {...register("category")}/> */}
        <select className={style.select}{...register("category")}>
          <option value="" disabled hidden>
          </option>
          {category.map((category) => (
            <option key={category.id} value={category.category}>{category.category}</option>
          ))}
        </select>
        <label className={style.label}><small>Author</small></label>
        {/* <input className={style.input} type="text"  {...register("author")}/> */}
        <select className={style.select}{...register("author")}>
          <option value="" disabled hidden>
          </option>
          {authors.map((author) => (
            <option key={author.id} value={author.author_name}>{author.author_name}</option>
          ))}
        </select>
        <label className={style.label}><small>Status</small></label>
        {/* <input className={style.input} type="text"  {...register("status")}/> */}
        <select className={style.select}{...register("status")}>
          <option value="" disabled hidden>
          </option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Archived">Archived</option>
        </select>
        <button className={style.save} type="submit" disabled={loading}>
          {loading ? (isUpdate ? "Updating..." : "Saving...") 
                      : 
                      isUpdate ? "Update" : "Save"}
        </button>
        <Link href="/blog">
          <input className={style.cancel} type="button" value="Cancel" />
        </Link>
    </div>
  );
}