import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col justify-center items-center bg-muted'>
      <main className='pb-32'>
        <div>
          <div className="text-3xl font-semibold text-center p-5"><Link href={'/'}>Home</Link></div>
          <Card>
            <CardContent>
              {children}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
