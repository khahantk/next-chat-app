import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from "next";
import ForgotPasswordForm from "@/components/user/forgot-password-form";

export const metadata: Metadata = {
  title: 'Forgot Password'
}

export default async function ForgotPasswordPage() {
  const session = await auth();
    if (session) {
      return redirect('/');
    }
  return (
    <ForgotPasswordForm/>
  );
}
