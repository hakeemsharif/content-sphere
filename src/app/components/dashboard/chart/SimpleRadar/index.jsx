"use client"
import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  {
    category: 'Business',
    A: 100,
    B: 1,
    fullMark: 100,
  },
  {
    category: 'Lifestyles',
    A: 98,
    B: 130,
    fullMark: 100,
  },
  {
    category: 'Entertainment',
    A: 86,
    B: 130,
    fullMark: 100,
  },
  {
    category: 'Others',
    A: 10,
    B: 100,
    fullMark: 100,
  },
  {
    category: 'Sports',
    A: 85,
    B: 90,
    fullMark: 100,
  },
  {
    category: 'Technology',
    A: 65,
    B: 85,
    fullMark: 100,
  },
];
export default function SimpleRadar() {
  return (
    <ResponsiveContainer width="100%" height="80%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis />
        <Radar name="Category" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
