// pages/system-admin/SystemSettings.tsx
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { IconSettings, IconRefresh } from "@tabler/icons-react"
import { showToast } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    siteName: 'User Management System',
    siteDescription: 'Multi-role user management platform',
    maintenanceMode: false,
    userRegistration: true,
    maxFileSize: 10,
    sessionTimeout: 60,
    emailNotifications: true,
    systemNotifications: true,
  })

  const handleSaveSettings = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    showToast.success('System settings updated successfully')
  }

  const handleResetSettings = () => {
    setSettings({
      siteName: 'User Management System',
      siteDescription: 'Multi-role user management platform',
      maintenanceMode: false,
      userRegistration: true,
      maxFileSize: 10,
      sessionTimeout: 60,
      emailNotifications: true,
      systemNotifications: true,
    })
    showToast.info('Settings reset to defaults')
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
              <p className="text-muted-foreground">
                Configure system-wide settings and preferences
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleResetSettings}>
                <IconRefresh className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleSaveSettings}>
                <IconSettings className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Basic system configuration and information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Put the system in maintenance mode
                    </div>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* User Settings */}
            <Card>
              <CardHeader>
                <CardTitle>User Settings</CardTitle>
                <CardDescription>
                  Configure user-related preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>User Registration</Label>
                    <div className="text-sm text-muted-foreground">
                      Allow new users to register
                    </div>
                  </div>
                  <Switch
                    checked={settings.userRegistration}
                    onCheckedChange={(checked) => setSettings({...settings, userRegistration: checked})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) => setSettings({...settings, maxFileSize: parseInt(e.target.value)})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Send email notifications for important events
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Show system-wide notifications
                    </div>
                  </div>
                  <Switch
                    checked={settings.systemNotifications}
                    onCheckedChange={(checked) => setSettings({...settings, systemNotifications: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SystemSettings