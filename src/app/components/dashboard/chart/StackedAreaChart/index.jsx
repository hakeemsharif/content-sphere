"use client"
import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function StackedAreaChart() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/count");
        const blogData = await response.json();
        setData(blogData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const monthOrder = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const grouped = {};
  
    // Initialize all months with zeroed categories
    monthOrder.forEach((month) => {
      grouped[month] = {
        name: month,
        business: 0,
        lifestyle: 0,
        entertainment: 0,
        technology: 0,
        sports: 0,
        others: 0,
      };
    });
  
    data.forEach((row) => {
      const month = row.name;
      const category = row.category;
      const count = row.count;
  
      // Just in case month from API isn't valid
      if (grouped[month]) {
        grouped[month][category] = count;
      }
    });
  
    const final = monthOrder.map((month) => grouped[month]);
    setChartData(final);
  }, [data]);
  

  return (
    <ResponsiveContainer width={"100%"} height="80%">
      <AreaChart
        data={chartData}
        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Others" stackId="1" stroke="#03045e" fill="#03045e" />
        <Area type="monotone" dataKey="Sports" stackId="1" stroke="#023e8a" fill="#023e8a" />
        <Area type="monotone" dataKey="Technology" stackId="1" stroke="#0077b6" fill="#0077b6" />
        <Area type="monotone" dataKey="Entertainment" stackId="1" stroke="#00b4d8" fill="#00b4d8" />
        <Area type="monotone" dataKey="Lifestyle" stackId="1" stroke="#90e0ef" fill="#90e0ef" />
        <Area type="monotone" dataKey="Business" stackId="1" stroke="#caf0f8" fill="#caf0f8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}


// AI assist (chart logic)