// components/dashboard/PolicyMakerDashboard.tsx
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconChartBar, IconFileAnalytics, IconTrendingUp } from "@tabler/icons-react"
import { useCitizens } from "@/hooks/useCitizens"

export const PolicyMakerDashboard: React.FC = () => {
  const { citizens } = useCitizens()
  
  const verifiedCount = citizens.filter(c => c.verification_status === 'verified').length
  const verificationRate = totalCount > 0 ? Math.round((verifiedCount / totalCount) * 100) : 0
  const totalCount = citizens.length

  const stats = [
    { title: "Total Verified", value: verifiedCount.toString(), description: "Citizens verified", icon: IconTrendingUp },
    { title: "Verification Rate", value: `${verificationRate}%`, description: "Success rate", icon: IconChartBar },
    { title: "Data Points", value: totalCount.toString(), description: "Available for analysis", icon: IconFileAnalytics },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Policy Maker Dashboard</h2>
          <p className="text-muted-foreground">
            Analyze data and generate reports for policy decisions
          </p>
        </div>
        <Button>Generate Report</Button>
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

      {/* Analytics Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Demographic Overview</CardTitle>
            <CardDescription>Citizen data distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Verified Citizens</span>
                <span className="font-medium">{verifiedCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending Verification</span>
                <span className="font-medium">{citizens.filter(c => c.verification_status === 'pending').length}</span>
              </div>
              <div className="flex justify-between">
                <span>Rejected Applications</span>
                <span className="font-medium">{citizens.filter(c => c.verification_status === 'rejected').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Reports</CardTitle>
            <CardDescription>Generate instant reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">Verification Summary</Button>
            <Button variant="outline" className="w-full justify-start">Demographic Analysis</Button>
            <Button variant="outline" className="w-full justify-start">Trend Report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}