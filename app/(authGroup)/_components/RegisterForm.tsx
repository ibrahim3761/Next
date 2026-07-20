"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/authActions";

const RegisterForm = () => {
    const [state, action, pending] = useActionState(registerAction, false);

    useEffect(()=>{
        if(!state) return;
        if(state.success){
            toast.success(state.message);
        }else{
            toast.error(state.message);
        }
    },[state])
  return (
    <form className="space-y-4" action={action}>
      <Card className="space-y-4 p-5">
        <Input
          name="name"
          placeholder="Enter Your Name"
          type="text"
          required
        />

        <Input
          name="email"
          placeholder="Enter Your Email"
          type="email"
          required
        />

        <Input
          name="password"
          placeholder="Enter Your Password"
          type="password"
          required
        />

        <Input
          name="profilePhoto"
          placeholder="Profile Photo URL"
          type="text"
        />

        <Button type="submit" className="w-full">
          {pending ? "Creating Account..." : "Register"}
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;