import { Card, CardContent } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { Library } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col justify-center items-center bg-muted">
      <main className="pb-32">
        <div>
          <div className="text-3xl font-semibold text-center p-5">
            <div className="flex gap-2 items-center justify-center">
              <Link
                href="/"
                className="font-bold text-xl lg:text-2xl text-foreground flex items-center "
              >
                <Library className="inline-flex mr-0.5 lg:mr-3 size-8 lg:size-10 text-white border rounded-lg p-0.5 bg-primary" />
                {APP_NAME}
              </Link>
            </div>
          </div>
          <Card>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
