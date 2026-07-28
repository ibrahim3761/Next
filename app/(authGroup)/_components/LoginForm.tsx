"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React, { useActionState, useEffect } from 'react'
import { loginAction } from '../_actions/authActions';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
//import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? ""
    const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), false);
    //const router = useRouter();

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message);
            // client side navigation 
            //router.push('/dashboard');
        } else {
            toast.error(state.message);
        }
    }, [state])

    return (
        <div>
            <form className='space-y-4' action={action}>
                <Card className='p-5 space-y-4'>
                    <Input name='Email' placeholder='Enter Your Email' type='email' required />
                    <Input name='Password' placeholder='Enter Your Password' type='password' required />
                    <Button type='submit' className="cursor-pointer w-full">
                        {pending ? "Logging in..." : "Login"}
                    </Button>
                </Card>
            </form>
        </div>
    )
}

export default LoginForm