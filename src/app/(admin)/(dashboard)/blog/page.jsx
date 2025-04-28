"use client"

import React, { useEffect, useState } from 'react'
import style from "./blog.module.scss"
import Link from 'next/link'
import moment from 'moment'
import useDeleteBlog from '@/hooks/useDeleteBlog'

export default function BlogPage() {
    const [data, setData] = useState([])

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blog")
        const blogData = await response.json()
        setData(blogData)
      } catch (error) {
        console.error("Error fetching blog data:", error)
      }
    }

    useEffect(() => {
      fetchData();
    }, []);

    const { handleDelete } = useDeleteBlog(data, setData);

  return (
    <div className={style.container}>
      <h1>Blog Posts</h1>
      <Link href="/blog/create"><button className={style.button}>Add New Post</button></Link>
      
      <table className={style.table}>
          <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Categories</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={data?.id}>
                <td>{index + 1}</td>
                <td>{data?.title}</td>
                <td>{data?.author}</td>
                <td>{data?.category}</td>
                <td>{moment(data.created_at).format('DD-MMMM-YYYY')}</td>
                <td>
                  <Link href={'blog/update/' + data.id}><button className={style.action}>Edit</button></Link>
                  <button className={style.action} onClick={() => handleDelete(data.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}