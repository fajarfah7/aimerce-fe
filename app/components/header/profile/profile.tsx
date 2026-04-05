import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User2, LogOut } from "lucide-react";

type ProfileButtonProps = {
  name: string;
  handleLogout: () => void;
};

export function ProfileButton({ name, handleLogout }: ProfileButtonProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <User2 />
            <div className="md:block hidden">{name}</div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Fajar Fahrurozi</DropdownMenuLabel>

            <DropdownMenuItem>
              <Link href={"/account/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/account/store"}>Store</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Chart</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant={"destructive"}
            className="flex justify-between"
            onClick={handleLogout}
          >
            Logout
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
