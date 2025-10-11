// components/dashboard/CitizenDashboard.tsx
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconUser, IconFileDescription, IconClock } from "@tabler/icons-react"
import { useAuthContext } from "../auth/useAuthContext"
import { useCitizens } from "@/hooks/useCitizens"

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuthContext()
  const { citizens } = useCitizens()
  
  const userCitizen = citizens.find(c => c.user_id === user?.id)

  const stats = [
    { title: "Verification Status", value: userCitizen?.verification_status || "Not Applied", description: "Your application status", icon: IconUser },
    { title: "Applications", value: "1", description: "Total submissions", icon: IconFileDescription },
    { title: "Last Updated", value: "Today", description: "Profile activity", icon: IconClock },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Citizen Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your profile and verification status
          </p>
        </div>
        <Button>Update Profile</Button>
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
      {userCitizen && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your registered details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Full Name</span>
                <span className="font-medium">{userCitizen.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span>National ID</span>
                <span className="font-medium">{userCitizen.national_id}</span>
              </div>
              <div className="flex justify-between">
                <span>Date of Birth</span>
                <span className="font-medium">{new Date(userCitizen.date_of_birth).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Your contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Phone Number</span>
                <span className="font-medium">{userCitizen.phone_number}</span>
              </div>
              <div className="flex justify-between">
                <span>Address</span>
                <span className="font-medium">{userCitizen.address}</span>
              </div>
              <div className="flex justify-between">
                <span>Email</span>
                <span className="font-medium">{user?.email}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!userCitizen && (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              You haven't submitted your citizen information yet. Please complete your profile to start the verification process.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Start Verification Process</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}