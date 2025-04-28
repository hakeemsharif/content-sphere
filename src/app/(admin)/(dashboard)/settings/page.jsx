import style from "./settings.module.scss";
import CategoryCard from "@/app/components/settings/category";
import AuthorCard from "@/app/components/settings/author";
import UpdateProfileCard from "@/app/components/settings/updateprofile";
import NewUserCard from "@/app/components/settings/newuser";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (user?.user_metadata?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className={style.container}>
      <div className={style.card_one}>
        <h2 className={style.title}>Update Profile</h2>
        <UpdateProfileCard />
      </div>
      <div className={style.card_two}>
        <h2 className={style.title}>Add New Category</h2>
        <CategoryCard />
      </div>
      <div className={style.card_three}>
        <h2 className={style.title}>Add New User</h2>
        <NewUserCard />
      </div>
      <div className={style.card_four}>
        <h2 className={style.title}>Add New Author</h2>
        <AuthorCard />
      </div>
    </div>
  );
}
