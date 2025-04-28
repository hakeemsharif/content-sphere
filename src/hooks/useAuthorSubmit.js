import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

export default function useAuthorSubmit() {
    const supabase = createClient();
    const [loading, setLoading] = useState(false)

    const schema = z.object({
    author_name: z.string().min(1),
    });

    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (e) => {
        setLoading(true);

        const { data, error } = await supabase
            .from("authors")
            .insert([{author_name: e.author_name}])
            .select();

        if (error) {
            console.log(error)
        }

        if (data) {
            reset();
            setLoading(false);
        }
    }

  return {handleSubmit, onSubmit, register, loading}
}