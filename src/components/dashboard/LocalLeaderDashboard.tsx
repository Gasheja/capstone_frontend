// components/dashboard/LocalLeaderDashboard.tsx
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconUserCheck, IconUser, IconClock } from "@tabler/icons-react"
import { useCitizens } from "@/hooks/useCitizens"

export const LocalLeaderDashboard: React.FC = () => {
  const { citizens } = useCitizens()
  
  const pendingCount = citizens.filter(c => c.verification_status === 'pending').length
  const verifiedCount = citizens.filter(c => c.verification_status === 'verified').length
  const totalCount = citizens.length

  const stats = [
    { title: "Pending Verification", value: pendingCount.toString(), description: "Awaiting review", icon: IconClock },
    { title: "Verified Citizens", value: verifiedCount.toString(), description: "Successfully verified", icon: IconUserCheck },
    { title: "Total Citizens", value: totalCount.toString(), description: "In the system", icon: IconUser },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Local Leader Dashboard</h2>
          <p className="text-muted-foreground">
            Manage citizen verification and records
          </p>
        </div>
        <Button>New Verification</Button>
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Verification Requests</CardTitle>
          <CardDescription>Latest citizen applications awaiting review</CardDescription>
        </CardHeader>
        <CardContent>
          {citizens.filter(c => c.verification_status === 'pending').slice(0, 5).map((citizen) => (
            <div key={citizen.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium">{citizen.full_name}</p>
                <p className="text-sm text-muted-foreground">{citizen.national_id}</p>
              </div>
              <Button size="sm">Review</Button>
            </div>
          ))}
          {pendingCount === 0 && (
            <p className="text-center text-muted-foreground py-4">No pending verification requests</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}