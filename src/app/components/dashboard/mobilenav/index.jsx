"use client"

import React from 'react'
import style from './mobilenav.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileNav(user) {

  const currentPath = usePathname();

  return (
    <header>
      <nav className={style.navbar}>
      
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
      </nav>
    </header>
  )
}
