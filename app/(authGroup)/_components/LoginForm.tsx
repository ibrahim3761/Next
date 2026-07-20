"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react'

const LoginForm = () => {
    return (
        <div>
            <form className='space-y-4'>
                <Card className='p-5 space-y-4'>
                    <Input name='Email' placeholder='Enter Your Email' type='email' required />
                    <Input name='Password' placeholder='Enter Your Password' type='password' required />
                    <Button type='submit' className="w-full">Login</Button>
                </Card>
            </form>
        </div>
    )
}

export default LoginForm