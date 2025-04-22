import { auth } from '@/auth'
import Nav from "./nav";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const Header = async () => {
  const session = await auth();
  console.log(`User: ${session?.user?.id} - ${session?.user?.name}`)
  return (
    <div className="flex sticky top-0 z-50 border-b bg-background/75 backdrop-blur border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-4">
          <div><Link href="/" className="font-bold text-2xl text-green-700"><MessageCircle className="inline-flex mr-3 size-10 text-green-700"/>Messages</Link></div>
          <Nav/>
        </div>
      </div>
    </div>
  );
}
 
export default Header;