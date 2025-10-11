// components/app-sidebar.tsx
import * as React from "react"
import { IconInnerShadowTop } from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthContext } from "./auth/useAuthContext"
import { getNavData, getUserData } from "./nav-data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthContext()
  
  const userData = getUserData(user)
  const { navMain, navSecondary } = getNavData(user?.role || 'citizen')

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
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">User Management</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-2 py-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            {getRoleDisplayName(user?.role || 'citizen')} Panel
          </div>
        </div>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}