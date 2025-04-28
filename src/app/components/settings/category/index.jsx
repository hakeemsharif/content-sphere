"use client"

import React from "react";
import style from "./category.module.scss"
import useCategorySubmit from "@/hooks/useCategorySubmit";

export default function CategoryCard() {

  const {handleSubmit, onSubmit, register, loading}  = useCategorySubmit();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={style.label}><small>Category</small></label>
      <input className={style.input} type="text" disabled={loading} {...register("category")}/>
      <button className={style.save} type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
