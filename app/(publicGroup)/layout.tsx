import { Navbar } from '@/components/shared/navbar'
import { getMe } from '@/service/getMe';
import React from 'react'

const PublicGroupLayout = async (
    { children }: { children: React.ReactNode }
) => {
    const user = await getMe();
    console.log(user);
    return (
        <>
            <Navbar user={user} />
            {children}
        </>
    )
}

export default PublicGroupLayout