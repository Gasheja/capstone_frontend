// pages/citizen/Profile.tsx
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IconUser, IconEdit, IconCalendar, IconPhone, IconMapPin } from "@tabler/icons-react"
import { useAuthContext } from "@/components/auth/useAuthContext"
import { useCitizens } from "@/hooks/useCitizens"
import { showToast } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const Profile: React.FC = () => {
  const { user } = useAuthContext()
  const { citizens, createCitizen, updateCitizen } = useCitizens()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  
  const userCitizen = Array.isArray(citizens) ? citizens[0] : citizens

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    const data = {
      national_id: formData.get('national_id') as string,
      full_name: formData.get('full_name') as string,
      date_of_birth: formData.get('date_of_birth') as string,
      address: formData.get('address') as string,
      phone_number: formData.get('phone_number') as string,
    }

    try {
      if (userCitizen) {
        await updateCitizen({ id: userCitizen.id, ...data })
        showToast.success('Profile updated successfully')
      } else {
        await createCitizen(data)
        showToast.success('Profile created successfully')
      }
      setIsEditDialogOpen(false)
    } catch (error: any) {
      showToast.error(error.response?.data?.message || 'Failed to save profile')
    }
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    }
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal information and verification status
              </p>
            </div>
            <Button onClick={() => setIsEditDialogOpen(true)}>
              <IconEdit className="h-4 w-4 mr-2" />
              {userCitizen ? 'Edit Profile' : 'Create Profile'}
            </Button>
          </div>

          {userCitizen ? (
            <div className="grid gap-6">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                  <CardDescription>
                    Current status of your citizen verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className={`text-lg ${getStatusBadge(userCitizen.verification_status)}`}>
                        {userCitizen.verification_status.toUpperCase()}
                      </Badge>
                      {userCitizen.verification_notes && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {userCitizen.verification_notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Last updated</div>
                      <div>{new Date(userCitizen.updated_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconUser className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Your registered details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Full Name</span>
                      <span>{userCitizen.full_name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">National ID</span>
                      <span className="font-mono">{userCitizen.national_id}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium flex items-center gap-2">
                        <IconCalendar className="h-4 w-4" />
                        Date of Birth
                      </span>
                      <span>{new Date(userCitizen.date_of_birth).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconPhone className="h-5 w-5" />
                      Contact Information
                    </CardTitle>
                    <CardDescription>Your contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium flex items-center gap-2">
                        <IconPhone className="h-4 w-4" />
                        Phone Number
                      </span>
                      <span>{userCitizen.phone_number}</span>
                    </div>
                    <div className="flex justify-between items-start py-2 border-b">
                      <span className="font-medium flex items-center gap-2">
                        <IconMapPin className="h-4 w-4" />
                        Address
                      </span>
                      <span className="text-right">{userCitizen.address}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Email</span>
                      <span>{user?.email}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Profile</CardTitle>
                <CardDescription>
                  You haven't submitted your citizen information yet. Please complete your profile to start the verification process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setIsEditDialogOpen(true)}>
                  Start Verification Process
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Create/Edit Profile Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {userCitizen ? 'Edit Profile' : 'Create Citizen Profile'}
                </DialogTitle>
                <DialogDescription>
                  {userCitizen 
                    ? 'Update your personal information' 
                    : 'Fill in your details to start the verification process'
                  }
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitProfile}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="national_id" className="text-sm font-medium">
                      National ID *
                    </label>
                    <Input
                      id="national_id"
                      name="national_id"
                      defaultValue={userCitizen?.national_id}
                      required
                      disabled={!!userCitizen}
                      placeholder="Enter your national identification number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="full_name" className="text-sm font-medium">
                      Full Name *
                    </label>
                    <Input
                      id="full_name"
                      name="full_name"
                      defaultValue={userCitizen?.full_name}
                      required
                      placeholder="Enter your full legal name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="date_of_birth" className="text-sm font-medium">
                      Date of Birth *
                    </label>
                    <Input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      defaultValue={userCitizen?.date_of_birth ? new Date(userCitizen.date_of_birth).toISOString().split('T')[0] : ''}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="phone_number" className="text-sm font-medium">
                      Phone Number *
                    </label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      defaultValue={userCitizen?.phone_number}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Address *
                    </label>
                    <Textarea
                      id="address"
                      name="address"
                      defaultValue={userCitizen?.address}
                      required
                      placeholder="Enter your complete address"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {userCitizen ? 'Update Profile' : 'Submit for Verification'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Profile