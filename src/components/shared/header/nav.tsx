import { signOut } from "@/actions";
import { auth } from '@/auth'
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shared/header/mode-toggle";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

const Nav = async () => {
  const session = await auth();
  const firstLetterOfName = session?.user?.name?.charAt(0).toUpperCase() ?? ''
  const authMenuItems =  (<div className="flex justify-center items-center">
    {session?.user?.name ? (
      <div className="flex gap-2 items-center z-[200]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center">
              <Button variant='ghost' className="relative w-8 h-8 rounded-full flex items-center justify-center bg-gray-200">{ firstLetterOfName }</Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex gap-2 flex-col">
                <div className="font-normal">{session.user?.name}</div>
                <div className="font-normal text-muted-foreground">{ session.user?.email }</div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={'/user/profile'}>My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/user/change-password'}>Change Password</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <form action={signOut} className="w-full"><Button type="submit" variant='ghost' className="w-full py-4 px-2 h-4 justify-start">Sign Out</Button></form>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
        
      </div>
    ) : (
        <div className="space-x-4">
          <Button variant='ghost'><Link href={'/signup'}>Sign Up</Link></Button>
          <Button type="button"><Link href={'/signin'}>Sign In</Link></Button>
        </div>
        
    )}
  </div>);
  
  return (
    <div className="flex justify-center items-center gap-6 pr-5 lg:pr-0">
      <ModeToggle />
      { authMenuItems }
    </div>
  )
}
export default Nav;