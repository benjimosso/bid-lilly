import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginShadcn } from '@/components/component/login-shadcn';


export default function LoginForm() {

    const LoginGoogle = async () => {
      'use server'
        const supabase = createClient();
        const origin = headers().get('origin')

    const {error, data} =   await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${origin}/auth/callback`
            }
        })

        if(error){
            console.log(error)
        }
        else {
            console.log(data)
            return redirect(data.url)
        }
    }
    
    const LoginEmail = async () => {

    }
  


  return (
    <div>
      <LoginShadcn LoginGoogle={LoginGoogle} ></LoginShadcn>
    </div>
  )
}
