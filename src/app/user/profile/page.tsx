import { Card, CardContent } from '@/components/ui/card';
import ProfileForm from '@/components/user/profile-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  return (
    <div className="w-full">
      <Card className="w-full pb-30 shadow-none">
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
