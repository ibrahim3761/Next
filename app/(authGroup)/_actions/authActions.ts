"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

type LoginState = {
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string,
    },
}

type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string;
  };
};

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData
) => {
  // console.log(prevState, "prevState");

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const profilePhoto = formData.get("profilePhoto");

  const payload = {
    name,
    email,
    password,
    profilePhoto,
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await res.json();

  // console.log(result, "result");

  return result;
};

export const loginAction = async (prevState : LoginState, formData: FormData) => {
    // console.log(formData);
    // console.log(prevState, 'prevState');
    const email = formData.get('Email');
    const password = formData.get('Password');

    const payload = {
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const result = await res.json();

    if(result.success){
        const cookieStore = await cookies()
        cookieStore.set('accessToken', result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite : "lax",
        })
        cookieStore.set('refreshToken', result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite : "lax",
        })

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if (decodedToken.role === 'ADMIN') {
            //server side navigation
            redirect('/admin-dashboard',"replace");
        }
        else if (decodedToken.role === 'USER') {
            //server side navigation
            redirect('/dashboard',"replace");
        }
        else if (decodedToken.role === 'AUTHOR') {
            //server side navigation
            redirect('/author/dashboard',"replace");
        }

        //server side navigation
        redirect('/dashboard',"replace");
    }

    return result;
    
};