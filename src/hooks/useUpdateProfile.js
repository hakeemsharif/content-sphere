import React from 'react'

export default function useUpdateProfile() {
    const supabase = createClient();
    
    const schema = z.object({
        role: z.string().min(1),
        description: z.string().min(1)
    });

    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit =  async (e) => {
        setLoading(true)
        const { data, error } =  await supabase.auth.updateUser({
            data: { 
              role: e.role,
              description: e.description
            }
          })

          
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
