"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const RegisterForm = () => {
  return (
    <form className="space-y-4">
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
          type="url"
        />

        <Button type="submit" className="w-full">
          Register
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;