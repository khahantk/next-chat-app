import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SignUpForm from "@/components/user/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign Up'
}

export default async function Signup() {
  const session = await auth();
    if (session) {
      return redirect('/');
    }
  return (
    <SignUpForm/>
  );
}
