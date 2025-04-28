import Link from 'next/link'
import style from './blog.module.scss'
import Image from 'next/image'

export default async function BlogsPage() {

  const response = await fetch("http://localhost:3000/api/blog")
  const data = await response.json()

  return (
    <main>
      <div className={style.section}>
        <h1 className={style.tagline}>Blogs</h1>
      </div>

      <div className={style.container}>
        {data.filter((item) => item.status === "Published").map((data) => (
          <Link href={`blogs/${data?.slug}`} key={data?.id}>
            <div className={style.card}>
              <h2>{data?.title}</h2>
              <Image
                src={data?.image || null}
                width={500}
                height={100}
                alt="Blog Image"
                className={style.featured}
              />
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}