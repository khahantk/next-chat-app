import { signOut } from '@/actions';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/shared/header/mode-toggle';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { MessageCircle } from 'lucide-react';

const Nav = async () => {
  const session = await auth();
  const firstLetterOfName = session?.user?.name?.charAt(0).toUpperCase() ?? '';
  const authMenuItems = (
    <div className="flex justify-center items-center">
      {session?.user?.name ? (
        <div className="flex gap-2 items-center z-[9999]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="relative size-9.5 rounded-full flex items-center justify-center bg-primary text-white text-lg cursor-pointer hover:text-white hover:bg-primary/80"
                >
                  {firstLetterOfName}
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex gap-2 flex-col">
                  <div className="font-normal">{session.user?.name}</div>
                  <div className="font-normal text-muted-foreground">
                    {session.user?.email}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={'/user/profile'}>My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={'/user/change-password'}>Change Password</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <form action={signOut} className="w-full">
                  <Button
                    type="submit"
                    variant="ghost"
                    className="w-full py-4 px-2 h-4 justify-start"
                  >
                    Sign Out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="lg:space-x-4 flex">
          <Button variant="ghost">
            <Link href={'/signup'}>Sign Up</Link>
          </Button>
          <Button type="button">
            <Link href={'/signin'}>Sign In</Link>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex justify-center items-center gap-2 lg:gap-6 lg:pr-0">
      <Button size="icon" className="size-9.5 hover:bg-primary/80">
        <Link href={'/messages'}>
          <MessageCircle/>
        </Link>
      </Button>
      {authMenuItems}
    </div>
  );
};
export default Nav;
