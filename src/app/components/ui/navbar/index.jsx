import React from 'react'
import style from './navbar.module.scss'
import Link from 'next/link'
export default function Navbar() {
  return (
    <header>
      <nav className={style.navbar}>
        <div className={style.logo}>
          <h3>Content Sphere</h3>
        </div>

        <div className={style.links}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blogs">Blogs</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
