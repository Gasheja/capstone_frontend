// pages/settings/AccountSettings.tsx
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    IconUser, 
    IconShield, 
    // IconBell,
    IconDeviceFloppy as IconSave
} from "@tabler/icons-react"
import { useAuthContext } from "@/components/auth/useAuthContext"
import { showToast } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useSettings } from '@/hooks/useSettings'

const AccountSettings: React.FC = () => {
    const { user } = useAuthContext()
    const { 
        accountSettings, 
        updateAccountSettings, 
        changePassword,
        isLoading 
    } = useSettings()

    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
    })
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        pushNotifications: false,
        securityAlerts: true,
        newsletter: false,
    })
    const [isSaving, setIsSaving] = useState(false)

    // Load account settings when component mounts
    useEffect(() => {
        if (accountSettings) {
            setProfile({
                name: accountSettings.name || user?.name || '',
                email: accountSettings.email || user?.email || '',
            })
            setPreferences({
                emailNotifications: accountSettings.email_notifications ?? true,
                pushNotifications: accountSettings.push_notifications ?? false,
                securityAlerts: accountSettings.security_alerts ?? true,
                newsletter: accountSettings.newsletter ?? false,
            })
        }
    }, [accountSettings, user])

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            await updateAccountSettings({
                name: profile.name,
                email: profile.email,
                email_notifications: preferences.emailNotifications,
                push_notifications: preferences.pushNotifications,
                security_alerts: preferences.securityAlerts,
                newsletter: preferences.newsletter,
            })
            showToast.success('Profile updated successfully')
        } catch (error: any) {
            showToast.error(error.response?.data?.message || 'Failed to update profile')
        } finally {
            setIsSaving(false)
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (password.newPassword !== password.confirmPassword) {
            showToast.error('New passwords do not match')
            return
        }

        if (password.newPassword.length < 6) {
            showToast.error('Password must be at least 6 characters long')
            return
        }

        setIsSaving(true)

        try {
            await changePassword({
                current_password: password.currentPassword,
                new_password: password.newPassword,
                new_password_confirmation: password.confirmPassword,
            })
            showToast.success('Password changed successfully')
            setPassword({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        } catch (error: any) {
            showToast.error(error.response?.data?.message || 'Failed to change password')
        } finally {
            setIsSaving(false)
        }
    }

    // const handleSavePreferences = async () => {
    //     setIsSaving(true)

    //     try {
    //         await updateAccountSettings({
    //             name: profile.name,
    //             email: profile.email,
    //             email_notifications: preferences.emailNotifications,
    //             push_notifications: preferences.pushNotifications,
    //             security_alerts: preferences.securityAlerts,
    //             newsletter: preferences.newsletter,
    //         })
    //         showToast.success('Preferences updated successfully')
    //     } catch (error: any) {
    //         showToast.error(error.response?.data?.message || 'Failed to update preferences')
    //     } finally {
    //         setIsSaving(false)
    //     }
    // }

    if (isLoading) {
        return (
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                        <p className="text-muted-foreground">
                            Manage your account settings and preferences
                        </p>
                    </div>

                    <Tabs defaultValue="profile" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="profile" className="flex items-center gap-2">
                                <IconUser className="h-4 w-4" />
                                Profile
                            </TabsTrigger>
                            <TabsTrigger value="security" className="flex items-center gap-2">
                                <IconShield className="h-4 w-4" />
                                Security
                            </TabsTrigger>
                            {/* <TabsTrigger value="notifications" className="flex items-center gap-2">
                                <IconBell className="h-4 w-4" />
                                Notifications
                            </TabsTrigger> */}
                        </TabsList>

                        {/* Profile Tab */}
                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>
                                        Update your account profile information
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSaveProfile} className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                placeholder="Enter your full name"
                                                disabled={isSaving}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                placeholder="Enter your email address"
                                                disabled={isSaving}
                                            />
                                        </div>
                                        <Button type="submit" disabled={isSaving}>
                                            <IconSave className="h-4 w-4 mr-2" />
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Security Tab */}
                        <TabsContent value="security">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Change Password</CardTitle>
                                    <CardDescription>
                                        Update your password to keep your account secure
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleChangePassword} className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="currentPassword">Current Password</Label>
                                            <Input
                                                id="currentPassword"
                                                type="password"
                                                value={password.currentPassword}
                                                onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
                                                placeholder="Enter current password"
                                                disabled={isSaving}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <Input
                                                id="newPassword"
                                                type="password"
                                                value={password.newPassword}
                                                onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                                                placeholder="Enter new password (min. 6 characters)"
                                                disabled={isSaving}
                                                required
                                                minLength={6}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                value={password.confirmPassword}
                                                onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                                                placeholder="Confirm new password"
                                                disabled={isSaving}
                                                required
                                                minLength={6}
                                            />
                                        </div>
                                        <Button type="submit" disabled={isSaving}>
                                            <IconShield className="h-4 w-4 mr-2" />
                                            {isSaving ? 'Changing Password...' : 'Change Password'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Notifications Tab */}
                        {/* <TabsContent value="notifications">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notification Preferences</CardTitle>
                                    <CardDescription>
                                        Configure how you want to receive notifications
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Email Notifications</Label>
                                                <div className="text-sm text-muted-foreground">
                                                    Receive notifications via email
                                                </div>
                                            </div>
                                            <Switch
                                                checked={preferences.emailNotifications}
                                                onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                                                disabled={isSaving}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Push Notifications</Label>
                                                <div className="text-sm text-muted-foreground">
                                                    Receive push notifications in browser
                                                </div>
                                            </div>
                                            <Switch
                                                checked={preferences.pushNotifications}
                                                onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                                                disabled={isSaving}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Security Alerts</Label>
                                                <div className="text-sm text-muted-foreground">
                                                    Receive security-related notifications
                                                </div>
                                            </div>
                                            <Switch
                                                checked={preferences.securityAlerts}
                                                onCheckedChange={(checked) => setPreferences({ ...preferences, securityAlerts: checked })}
                                                disabled={isSaving}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Newsletter</Label>
                                                <div className="text-sm text-muted-foreground">
                                                    Receive monthly newsletter and updates
                                                </div>
                                            </div>
                                            <Switch
                                                checked={preferences.newsletter}
                                                onCheckedChange={(checked) => setPreferences({ ...preferences, newsletter: checked })}
                                                disabled={isSaving}
                                            />
                                        </div>
                                        <Button onClick={handleSavePreferences} disabled={isSaving}>
                                            <IconSave className="h-4 w-4 mr-2" />
                                            {isSaving ? 'Saving...' : 'Save Preferences'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent> */}
                    </Tabs>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default AccountSettings