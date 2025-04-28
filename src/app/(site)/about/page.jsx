import React from 'react'
import style from "./about.module.scss"
import Image from 'next/image'
import heroimage from "../../../../public/assets/pexel.jpg";

export default function AboutPage() {
  return (
    <main>
      <div className={style.section}>
        <h1 className={style.tagline}>About</h1>
        <p className={style.about_info}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed at lobortis justo, ut iaculis diam. Praesent at odio urna. 
            Morbi at eros eget  tellus ornare convallis ut vitae risus. 
            Nam et nunc ut nulla efficitur  maximus in in tellus. 
            Sed blandit interdum nunc at dapibus.
            <br/><br/>
            Etiam  faucibus, eros id suscipit eleifend, nibh sem sodales ex, a finibus  turpis metus quis ex. Aenean tincidunt est eu condimentum volutpat.  Nulla facilisi. In sit amet est lectus. Aliquam erat volutpat. Nunc  vehicula feugiat orci, sed cursus turpis pretium et.</p>
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
  )
}
