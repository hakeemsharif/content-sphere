import React from 'react'
import style from './updateprofile.module.scss'
import { update } from '@/lib/actions';

export default function UpdateProfileCard() {
    
  return (
    <form>
      <label className={style.label}><small>Role</small></label>
      <select className={style.select} name="role">
          <option value="" disabled hidden>
          </option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
        </select>
      <label className={style.label}><small>Short Description</small></label>
      <input className={style.input} type="text" name="description" />
      <button className={style.save} type="submit" formAction={update} >
            Update
        </button>
    </form>
  )
}
