'use client'

import style from "./content.module.scss"
import React, { useState } from 'react';
// import ReactQuill from "react-quill-new"; OG way to use ReactQuill
import ReactQuill from '@/app/components/ReactQuillEditor' // To prevent the document error
import "react-quill-new/dist/quill.snow.css";
import { useFormContext } from "react-hook-form";

export default function ContentForm({content, setContent}) {
    const { register, formState: { errors } } = useFormContext()
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link', 'image', 'code-block'],
          ['clean']
        ]
      };
      

  return (
    <div className={style.container}>
        <input className={errors.title ? style.error : style.input} type="text" placeholder='Add Title' {...register("title")}/>
        <div className={style.navigation}>
            <nav>
              <button 
                  className={toggleState === 1 ? style.tab_active : style.tab} type="button" onClick={() => toggleTab(1)}>
                  Write
              </button>
              <button 
                  className={toggleState === 2 ? style.tab_active : style.tab} type="button" onClick={() => toggleTab(2)}>
                  Preview
              </button>
            </nav>
          </div>

          <div className={toggleState === 1 ? style.content_active : style.content}>
                <div className={style.info}>
                  <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules}/>
                </div>
            </div>

            <div className={toggleState === 2 ? style.content_active : style.content}>
                <div className={style.info}>
                  {content && (
                    <div
                      className={style.preview_content}
                      dangerouslySetInnerHTML={{ __html: `${content}` }}
                    />
                  )}
                </div>
            </div>
        
    </div>
  )
}
