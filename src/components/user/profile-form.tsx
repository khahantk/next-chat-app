'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useActionState, startTransition } from "react";
import { updateProfile } from "@/actions";
import { useSession } from "next-auth/react";

const initialStateProfileForm = {
  errors: {},
  message: '',
  status: false
}

const ProfileForm = () => {
  const session = useSession();
  console.log({ session })
  const [formState, action, isPending] = useActionState(updateProfile, initialStateProfileForm);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    })
  }
  return (
      <form className="flex flex-col min-w-87 p-5 max-w-2xl " onSubmit={handleSubmit}>
        <h1 className="text-2xl font-medium">My Profile</h1>
      <div className="flex flex-col gap-4 mt-8">
        {formState.status && formState.message && (
            <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{ formState.message }</AlertDescription>
          </Alert>
          )}
          <div>
            <Label htmlFor="email" className="pb-2">Email</Label>
            <Input type="email" name="email" value={session.data?.user?.email || ''} readOnly />            
          </div>
          <div>
            <Label htmlFor="name" className="pb-2">Name</Label>
            <Input type="text" name="name" defaultValue={session.data?.user?.name || ''}/>
            {!!formState.errors?.name ? <div className="text-red-400">{ formState.errors.name?.join(", ") }</div> : '' }
          </div>
         
          <Button disabled={isPending} className="max-w-fit px-5 rounded-full mt-3" variant={"outline"}>
            Update Profile
          </Button>
        </div>
      </form>
  );
}
 
export default ProfileForm;