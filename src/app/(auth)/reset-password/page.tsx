import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from "next";
import ResetPasswordForm from "@/components/user/reset-password-form";

export const metadata: Metadata = {
  title: 'Reset Password'
}

export default async function ResetPasswordPage() {
  const session = await auth();
    if (session) {
      return redirect('/');
    }
  return (
    <ResetPasswordForm/>
  );
}
