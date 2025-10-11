// components/dashboard/SystemAdminDashboard.tsx
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconUsers, IconShield, IconSettings } from "@tabler/icons-react"

export const SystemAdminDashboard: React.FC = () => {
  const stats = [
    { title: "Total Users", value: "1,234", description: "Across all roles", icon: IconUsers },
    { title: "Active Sessions", value: "89", description: "Currently online", icon: IconShield },
    { title: "System Health", value: "100%", description: "All systems operational", icon: IconSettings },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Administration</h2>
          <p className="text-muted-foreground">
            Manage users, security, and system settings
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage all system users and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Manage Users</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security policies and access controls</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Security Settings</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>View system activity and audit logs</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Logs</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}