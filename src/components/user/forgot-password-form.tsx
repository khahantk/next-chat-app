'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, startTransition } from "react";
import { forgotPassword } from "@/actions";

const initialStateForgotPasswordForm = {
  errors: {},
  message: '',
  status: false
}

const ForgotPasswordForm = () => {
  const [formState, action, isPending] = useActionState(forgotPassword, initialStateForgotPasswordForm);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    })
  }
  return (
    <>
      <form className="flex flex-col min-w-87 p-5 max-w-[420px] mx-auto" action={action}>
        <h1 className="text-2xl font-medium text-center">Forgot Password</h1>
        <div className="flex flex-col gap-4 mt-8">
          <div>
            <Label htmlFor="email" className="pb-2">Email</Label>
            <Input type="email" name="email" />
            {!!formState.errors?.email ? <div className="text-red-400">{ formState.errors.email?.join(", ") }</div> : '' }
            
          </div>
          {!!formState.errors?._form ? <div className="text-red-400">{ formState.errors._form?.join(", ") }</div> : '' }
          <div>{isPending ? 'Submitting...' : ''}</div>
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
          <p className="text-sm text text-foreground text-center py-3">
            Don't have an account?{" "}
            <Link className="text-primary font-medium underline" href="/signup">
              Sign up
            </Link>
          </p>
        </div>
        
      </form>
    </>
  );
}
 
export default ForgotPasswordForm;