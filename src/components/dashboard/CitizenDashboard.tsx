// components/dashboard/CitizenDashboard.tsx
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
import { IconUser, IconFileDescription, IconClock, IconEdit } from "@tabler/icons-react"
import { useAuthContext } from "../auth/useAuthContext"
import { useCitizens } from "@/hooks/useCitizens"

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuthContext()
  const { citizens, createCitizen, updateCitizen } = useCitizens()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  
  const userCitizen = citizens.find(c => c.user_id === user?.id)

  console.log('userCitizen Data: ', citizens)

  const stats = [
    { title: "Verification Status", value: userCitizen?.verification_status || "Not Applied", description: "Your application status", icon: IconUser },
    { title: "Applications", value: userCitizen ? "1" : "0", description: "Total submissions", icon: IconFileDescription },
    { title: "Last Updated", value: userCitizen ? new Date(userCitizen.updated_at).toLocaleDateString() : "Never", description: "Profile activity", icon: IconClock },
  ]

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
      } else {
        await createCitizen(data)
      }
      setIsEditDialogOpen(false)
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error('Failed to save profile:', error)
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Citizen Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your profile and verification status
          </p>
        </div>
        <Button onClick={() => userCitizen ? setIsEditDialogOpen(true) : setIsCreateDialogOpen(true)}>
          <IconEdit className="h-4 w-4 mr-2" />
          {userCitizen ? 'Edit Profile' : 'Create Profile'}
        </Button>
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
              <div className="text-2xl font-bold capitalize">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Information */}
      {userCitizen ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your registered details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Full Name</span>
                <span>{userCitizen.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">National ID</span>
                <span>{userCitizen.national_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date of Birth</span>
                <span>{new Date(userCitizen.date_of_birth).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Verification Status</span>
                <Badge className={getStatusBadge(userCitizen.verification_status)}>
                  {userCitizen.verification_status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Your contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Phone Number</span>
                <span>{userCitizen.phone_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Address</span>
                <span className="text-right">{userCitizen.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email</span>
                <span>{user?.email}</span>
              </div>
              {userCitizen.verification_notes && (
                <div className="flex justify-between items-start">
                  <span className="font-medium">Verification Notes</span>
                  <span className="text-right text-sm text-muted-foreground">
                    {userCitizen.verification_notes}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
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
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              Start Verification Process
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Profile Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false)
          setIsEditDialogOpen(false)
        }
      }}>
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsCreateDialogOpen(false)
                setIsEditDialogOpen(false)
              }}>
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
  )
}