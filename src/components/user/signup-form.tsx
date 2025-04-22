'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, startTransition } from "react";
import { signUp } from "@/actions";

const initialStateSignUp = {
  errors: {},
  message: '',
  status: false
}

const SignUpForm = () => {
  const [formState, action, isPending] = useActionState(signUp, initialStateSignUp);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    })
  }
  return (
      <form className="flex flex-col min-w-87 p-5 max-w-[420px] mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-medium text-center">Sign up</h1>
        <div className="text-center text-base pt-3">Enter your information to create an account</div>
        <div className="flex flex-col gap-4 mt-8">
          <div>
            <Label htmlFor="name" className="pb-2">Name</Label>
            <Input type="text" name="name" />
            {!!formState.errors?.name ? <div className="text-red-400">{ formState.errors.name?.join(", ") }</div> : '' }
          </div>
          <div>
            <Label htmlFor="email" className="pb-2">Email</Label>
            <Input type="email" name="email" />
            {!!formState.errors?.email ? <div className="text-red-400">{ formState.errors.email?.join(", ") }</div> : '' }
            
          </div>
          <div>
            <Label htmlFor="password" className="pb-2">Password</Label>
            <Input
              type="password"
              minLength={6}
              name="password"
            />
            {!!formState.errors?.password ? <div className="text-red-400">{ formState.errors.password?.join(", ") }</div> : '' }
          </div>
          <div>
          <Label htmlFor="confirmPassword" className="pb-2">Confirm Password</Label>
          <Input
            type="password"
            placeholder="Confirm password"
            minLength={6}
            name="confirmPassword"
          />
          {!!formState.errors?.confirmPassword ? <div className="rounded p-2 bg-red-200 border border-red-400">{ formState.errors.confirmPassword?.join(", ") }</div> : '' }
          </div>
          <div>{isPending ? 'Submitting...' : ''}</div>
          <Button>
            Sign up
          </Button>
          <p className="text-foreground text-center p-2">
            Already have an account?{" "}
            <Link className="text-primary font-medium underline" href="/signin">
              Sign in
            </Link>
          </p>
        </div>
      </form>
  );
}
 
export default SignUpForm;