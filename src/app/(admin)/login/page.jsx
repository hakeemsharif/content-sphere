
import Image from "next/image"
import style from "./login.module.scss"
import heroimage from "../../../../public/assets/pexel.jpg"
import { login, signup } from "@/lib/actions"
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data?.user) {
    redirect('/dashboard');
  }

  return (
    <main>
      <div className={style.page}>
        <div className={style.hero}>
          <Image
            src={heroimage}
            alt="Image"
            className={style.image}/>
        </div>
        <div className={style.container}>

            <form className={style.form}>
              <h1 className={style.title}>Access to Content Sphere</h1>
              <label className={style.label}>Email</label>
              <input className={style.input} type="email" name="email"/>
              <label className={style.label}>Password</label>
              <input className={style.input} type="password" name="password"/>
              {/* <input className={style.button} type="submit" value="Login" onClick={login}/><br></br> */}
               {/* Use formAction for proper server action binding */}
              <button className={style.button} type="submit" formAction={login}>Login</button>
              {/* <button className={style.button} type="submit" formAction={signup}>Sign up</button> */}
            </form>
        </div>
      </div>
    </main>
  )
}
