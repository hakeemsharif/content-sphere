import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/app/components/dashboard/navbar";
import MobileNav from "@/app/components/dashboard/mobilenav";
import NextTopLoader from "nextjs-toploader";
import "./layout.css";

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();

//OG
//   const { data, error } = await supabase.auth.getUser();
//   if (error || !data?.user) {
//     redirect("/admin");
//   }
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");

  }

  return (
    <html>
      <body>
          <NextTopLoader color="#000000" showSpinner={false}/>
          <Navbar user={user}/>
          <main>{children}</main>  
          <MobileNav user={user} />
      </body>
    </html>
  );
}
