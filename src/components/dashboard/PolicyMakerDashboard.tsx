// components/dashboard/PolicyMakerDashboard.tsx
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'
import { IconChartBar, IconFileAnalytics, IconTrendingUp, IconDownload } from "@tabler/icons-react"
import { useAnalytics } from "@/hooks/useAnalytics"
// import { useCitizens } from "@/hooks/useCitizens"

export const PolicyMakerDashboard: React.FC = () => {
  const { stats, trends, demographics, isLoading } = useAnalytics()
  // const { citizens } = useCitizens()

  const verificationData = [
    { name: 'Verified', value: stats?.verified_citizens || 0 },
    { name: 'Pending', value: stats?.pending_citizens || 0 },
    { name: 'Rejected', value: stats?.rejected_citizens || 0 },
  ]

  const COLORS = ['#10b981', '#f59e0b', '#ef4444']

  const ageData = demographics || []

  const statsData = [
    { title: "Total Verified", value: stats?.verified_citizens?.toString() || "0", description: "Citizens verified", icon: IconTrendingUp },
    { title: "Verification Rate", value: `${stats?.verification_rate || 0}%`, description: "Success rate", icon: IconChartBar },
    { title: "Total Data Points", value: stats?.total_citizens?.toString() || "0", description: "Available for analysis", icon: IconFileAnalytics },
  ]

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      stats,
      trends,
      demographics,
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Policy Maker Dashboard</h2>
          <p className="text-muted-foreground">
            Analyze data and generate reports for policy decisions
          </p>
        </div>
        <Button onClick={exportReport}>
          <IconDownload className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsData.map((stat, index) => (
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

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Verification Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>Distribution of citizen verification status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>Citizen demographics by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age_group" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Verification Trends */}
        {trends && trends.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Verification Trends</CardTitle>
              <CardDescription>Daily verification activity over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total Applications" />
                  <Line type="monotone" dataKey="verified" stroke="#10b981" name="Verified" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detailed Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Statistics</CardTitle>
          <CardDescription>Comprehensive overview of system data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="text-2xl font-bold">{stats?.total_citizens || 0}</div>
              <div className="text-sm text-muted-foreground">Total Citizens</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{stats?.verified_citizens || 0}</div>
              <div className="text-sm text-muted-foreground">Verified Citizens</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{stats?.pending_citizens || 0}</div>
              <div className="text-sm text-muted-foreground">Pending Verification</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{stats?.total_users || 0}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}