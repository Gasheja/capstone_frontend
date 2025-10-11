// components/site-header.tsx
import { useAuthContext } from "./auth/useAuthContext"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./ui/mode-toggle"
import { ThemeSelector } from "./theme-selector"

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
          <ThemeSelector /> 
          <ModeToggle />
        </div>
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={handleLogout}
          size="sm"
        >
          Logout
        </Button>
      </div>
    </header>
  )
}