// components/site-header.tsx
import { useAuthContext } from "./auth/useAuthContext"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./ui/mode-toggle"
// import { ThemeSelector } from "./theme-selector"
import {
  //  Bell, 
   Settings, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback,
  //  AvatarImage 
  } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const { user, logout } = useAuthContext()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const getRoleDisplayName = (role: string) => {
    const roleNames: { [key: string]: string } = {
      system_admin: 'System Administrator',
      local_leader: 'Local Leader',
      policy_maker: 'Policy Maker',
      citizen: 'Citizen',
    }
    return roleNames[role] || role
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-16 lg:px-6">
      <SidebarTrigger />
      <div className="flex-1">
        <h1 className="text-lg font-semibold">
          Welcome back, {user?.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {getRoleDisplayName(user?.role || 'citizen')}
        </p>
        
      </div>

       <div className="ml-auto flex items-center gap-2">
          {/* <ThemeSelector />  */}
          <ModeToggle />
        </div>
      <div className="flex items-center gap-4">
        {/* <Button 
          variant="outline" 
          onClick={handleLogout}
          size="sm"
        >
          Logout
        </Button> */}

                  {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full cursor-pointer p-0"
              >
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src={user?.avatar} alt={user?.name} /> */}
                  <AvatarFallback className="font-medium">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                  {/* <p className="text-xs text-blue-600 font-medium mt-1">
                    {
                    user.role}
                  </p> */}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/account-settings">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/account-settings">
                {" "}
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>{" "}
              </Link>

              {/* <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </header>
  )
}