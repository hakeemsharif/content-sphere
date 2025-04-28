"use client"

import React, { useEffect, useState } from 'react'
import style from "./table.module.scss"
import moment from 'moment'

export default function BlogTable() {

        const [data, setData] = useState([])
    
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:3000/api/blog")
            const blogData = await response.json()
            
            // Filter for only entries from the last 3 days
            const threeDaysAgo = moment().subtract(3, 'days').startOf('day')
            const filteredData = blogData.filter(item => 
                moment(item.created_at).isAfter(threeDaysAgo)
            )
      
            setData(filteredData)
          } catch (error) {
            console.error("Error fetching blog data:", error)
          }
        }
    
        useEffect(() => {
          fetchData();
        }, []);
    

  return (
    <table className={style.table}>
    <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Author</th>
      <th>Categories</th>
      <th>Date Created</th>
    </tr>
    </thead>
    <tbody>
      {data.map((data, index) => (
        <tr key={data?.id}>
          <td>{index + 1}</td>
          <td>{data?.title}</td>
          <td>{data?.author}</td>
          <td>{data?.category}</td>
          <td>{moment(data.created_at).format('DD-MMM-YYYY')}</td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}
