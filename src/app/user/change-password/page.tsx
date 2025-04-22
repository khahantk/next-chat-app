import { Card, CardContent } from "@/components/ui/card";
import ChangePasswordForm from '@/components/user/change-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change password',
};

export default function ChangePasswordPage() {
  return (
    <div className="w-full">
      <Card className="w-full pb-30 shadow-none">
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
