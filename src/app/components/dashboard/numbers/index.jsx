"use client";

import React from "react";
import style from "./numbers.module.scss";
import useFetchPublished from "@/hooks/useFetchPublished";
import useFetchActiveUser from "@/hooks/useFetchActiveUser";
import useFetchPending from "@/hooks/useFetchPending";
import useFetchArchived from "@/hooks/useFetchArchived";

export default function NumbersCard() {

    const { onlineUsers } = useFetchActiveUser();
    const { published } = useFetchPublished();
    const { archived } = useFetchArchived();
    const { pending } = useFetchPending();    


  return (
    <div className={style.container}>
        <div className={style.card_one}>
            <h1 className={style.count}>{onlineUsers}</h1>
            <span>users online</span>
        </div>

        <div className={style.card_two}>
            <h1 className={style.count}>{published}</h1>
            <span>published post</span>
        </div>

        <div className={style.card_three}>
            <h1 className={style.count}>{archived}</h1>
            <span>archived post</span>
        </div>

        <div className={style.card_four}>
            <h1 className={style.count}>{pending}</h1>
            <span>pending post</span>
        </div>
    </div>
  );
}

 
// REF 
// https://www.youtube.com/watch?v=IfImokndvfM (with AI assist)