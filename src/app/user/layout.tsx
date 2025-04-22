import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import Link from "next/link";

export default function UserProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3">
              <div>
                <h2 className="text-2xl font-semibold">Settings</h2>
                <div className="flex flex-col gap-2 mt-3">
                  <div><Link href={'/user/profile'} className="text-lg">Profile Settings</Link></div>
                  <div><Link href={'/user/change-password'}>Change Password</Link></div>
                </div>
              </div>
            </div>
            <div className="col-span-9">{children}</div>
          </div>
        </div>
      </main>
      <footer className="container mx-auto">
        <div className="flex justify-center items-center min-h-28">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
