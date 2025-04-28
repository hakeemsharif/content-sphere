import Image from "next/image";
import style from "./page.module.css";
import heroimage from "../../../public/assets/pexel2.jpg";

export default function Home() {
  return (
    <main>
      <div className={style.section}>
        <h1 className={style.tagline}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
        <button className={style.button}>Blog</button>
      </div>

      <div className={style.image_section}>
        <Image
          src={heroimage}
          alt="Image"
          fill={true}
          className={style.image}
          style={{ objectFit: 'cover' }}
        />
      </div>
    </main>
  );
}