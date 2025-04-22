import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import SignInForm from "@/components/user/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign In'
}

export default async function SignIn() {
  const session = await auth();
  if (session) {
    return redirect('/');
  }
  return (
    <SignInForm/>
  );
}
