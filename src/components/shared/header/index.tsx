import { auth } from '@/auth'
import Nav from "./nav";
import Link from "next/link";
import { Library, MessageCircle } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

const Header = async () => {
  const session = await auth();
  return (
    <div className="flex border-b bg-background/75 backdrop-blur border-gray-200 dark:border-gray-800 shadow z-[10] lg:z-[999]">
      <div className="container mx-auto px-2 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center py-4">
          <div className="flex gap-2">
            <Link href="/" className="font-bold text-xl lg:text-2xl text-foreground flex items-center  ">
              <Library className="inline-flex mr-0.5 lg:mr-3 size-8 lg:size-10 text-white border rounded-lg p-0.5 bg-primary" />{APP_NAME}
            </Link>
          </div>
          <Nav/>
        </div>
      </div>
    </div>
  );
}
 
export default Header;