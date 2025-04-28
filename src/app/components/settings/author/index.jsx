"use client"

import React from "react";
import style from "./author.module.scss"
import useAuthorSubmit from "@/hooks/useAuthorSubmit";

export default function AuthorCard() {

    const {handleSubmit, onSubmit, register, loading} = useAuthorSubmit();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={style.label}><small>Author Name</small></label>
      <input className={style.input} type="text" disabled={loading} {...register("author_name")}/>
      <button className={style.save} type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
        </button>
    </form>
  );
}
