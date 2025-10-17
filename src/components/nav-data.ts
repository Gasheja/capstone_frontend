// components/nav-data.ts
import {
  IconDashboard,
  IconUsers,
  IconUserCheck,
  IconChartBar,
  // IconSettings,
  // IconShield,
  IconFileAnalytics,
  IconUser,
  IconListDetails,
  IconUserCog,
} from "@tabler/icons-react"

export interface NavItem {
  title: string
  url: string
  icon: any
  roles?: string[] // If undefined, accessible to all roles
  items?: NavItem[]
}

export interface UserData {
  name: string
  email: string
  avatar: string
  role: string
}

// Role-based navigation data
export const getNavData = (userRole: string) => {
  const commonNavMain: NavItem[] = [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
  ]

  const roleBasedNavMain: NavItem[] = [
    // System Administrator
    {
      title: "User Management",
      url: "/users",
      icon: IconUsers,
      roles: ['system_admin']
    },
    // {
    //   title: "System Settings",
    //   url: "/system-settings",
    //   icon: IconSettings,
    //   roles: ['system_admin']
    // },
    // {
    //   title: "Security",
    //   url: "/security",
    //   icon: IconShield,
    //   roles: ['system_admin']
    // },

    // Local Leader
    {
      title: "Citizen Verification",
      url: "/verification",
      icon: IconUserCheck,
      roles: ['local_leader']
    },
    // {
    //   title: "Citizen Records",
    //   url: "/citizens",
    //   icon: IconListDetails,
    //   roles: ['local_leader', 'system_admin']
    // },

    // Policy Maker
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
      roles: ['policy_maker']
    },
    {
      title: "Reports",
      url: "/reports",
      icon: IconFileAnalytics,
      roles: ['policy_maker']
    },

    // Citizen
    {
      title: "My Profile",
      url: "/profile",
      icon: IconUser,
      roles: ['citizen']
    },
    {
      title: "My Applications",
      url: "/applications",
      icon: IconListDetails,
      roles: ['citizen']
    },
  ]

  const navSecondary: NavItem[] = [
    {
      title: "Account Settings",
      url: "/account-settings",
      icon: IconUserCog,
    },
  ]

  // Filter nav items based on user role
  const filteredNavMain = [
    ...commonNavMain,
    ...roleBasedNavMain.filter(item => 
      !item.roles || item.roles.includes(userRole)
    )
  ]

  return {
    navMain: filteredNavMain,
    navSecondary,
  }
}

export const getUserData = (user: any): UserData => ({
  name: user?.name || "User",
  email: user?.email || "user@example.com",
  avatar: "/avatars/user.jpg",
  role: user?.role || "citizen"
})