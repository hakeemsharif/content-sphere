import style from './details.module.scss'
import Image from 'next/image';
export default async function BlogDetails({params}) {
    const { slug } = await params;
    const response = await fetch(`http://localhost:3000/api/blogpage/${slug}`)
    const data = await response.json()

  return (
    <main>
      <article className={style.article}>
        <Image
            className={style.image}
            src={data?.image}
            width={1000}
            height={500}
            alt='Featured Image'
        />
        <h1>{data?.title}</h1>

        <div
            className={style.content}
            dangerouslySetInnerHTML={{ __html: `${data?.content}` }}
          />
      </article>
    </main>
  )
}
