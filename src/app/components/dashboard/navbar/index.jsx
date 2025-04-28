"use client"

import React from 'react'
import style from './navbar.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import Profile from '../../../../../public/assets/profile.png'
import { usePathname } from 'next/navigation'

export default function Navbar(user) {

  const currentPath = usePathname();

  return (
    <header>
      <nav className={style.navbar}>
        <div className={style.logo}>
          <h3>Content Sphere</h3>
        </div>
      
        <div className={style.links}>
          <ul>
            <li>
              <Link 
                  className={currentPath === "/dashboard" ? style.active : style.link}
                  href="/dashboard">
                  Dashboard
              </Link>
            </li>
            <li>
              <Link 
                  className={currentPath === "/blog" ? style.active : style.link}
                  href="/blog">
                  Blog
              </Link>
            </li>
            {/* {user?.user?.user_metadata?.role === "admin" 
            ? <li><Link href="/settings">Settings</Link></li> 
            : null} */}
            {user?.user?.user_metadata?.role === "admin" && (
              <li>
                <Link 
                  className={currentPath === "/settings" ? style.active : style.link}
                  href="/settings">
                 Settings
                </Link>
              </li>
            )}
            
            <li>
              <form action="/auth/signout" method="post">
                <button type="submit">Sign out</button>  
              </form>
            </li>
    

          </ul>
        </div>

        <div className={style.profile}>
          <small>{user?.user?.email}</small>
          {/* <Image src={Profile} alt='Logo'/> */}
        </div>
      </nav>
    </header>
  )
}
