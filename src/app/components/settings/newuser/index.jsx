import React from "react";
import style from "./newuser.module.scss";
import { signup } from "@/lib/actions";

export default function NewUserCard() {
  return (
    <form>
      <label className={style.label}>
        <small>Email</small>
      </label>
      <input className={style.input} type="email" name="email" />
      <label className={style.label}>
        <small>Password</small>
      </label>
      <input className={style.input} type="password" name="password" />
      <button className={style.save} type="submit" formAction={signup}>
        Save
      </button>
    </form>
  );
}
