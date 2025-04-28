import React from 'react'
import style from './dashboard.module.scss'
import StackedAreaChart from '@/app/components/dashboard/chart/StackedAreaChart'
import BlogTable from '@/app/components/ui/table'
import NumbersCard from '@/app/components/dashboard/numbers'
export default function DashboardPage() {


  return (
    <div className={style.container}>
      <div className={style.card_one}>
        <h2 className={style.title}>Blog Posts by Category</h2>
        <StackedAreaChart/>
      </div>
      <div className={style.card_three}>
        <NumbersCard/>
      </div>
      <div className={style.card_four}>
      <h2 className={style.title}>New in the Last 3 Days</h2>
      <BlogTable/>
      </div>
    </div>
  )
}
