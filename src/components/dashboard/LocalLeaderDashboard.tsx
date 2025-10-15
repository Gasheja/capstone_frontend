// components/dashboard/LocalLeaderDashboard.tsx
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IconUserCheck, IconUser, IconClock } from "@tabler/icons-react"
import { useCitizens } from "@/hooks/useCitizens"
import type { Citizen } from "@/types"

export const LocalLeaderDashboard: React.FC = () => {
  const { citizens, verifyCitizen } = useCitizens()
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null)
  const [verificationNotes, setVerificationNotes] = useState("")
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all')

  const pendingCount = citizens.filter(c => c.verification_status === 'pending').length
  const verifiedCount = citizens.filter(c => c.verification_status === 'verified').length
  const totalCount = citizens.length

  const stats = [
    { title: "Pending Verification", value: pendingCount.toString(), description: "Awaiting review", icon: IconClock },
    { title: "Verified Citizens", value: verifiedCount.toString(), description: "Successfully verified", icon: IconUserCheck },
    { title: "Total Citizens", value: totalCount.toString(), description: "In the system", icon: IconUser },
  ]

  const filteredCitizens = citizens.filter(citizen => 
    filter === 'all' || citizen.verification_status === filter
  )

  const handleVerification = (citizen: Citizen) => {
    setSelectedCitizen(citizen)
    setVerificationNotes("")
    setIsVerifyDialogOpen(true)
  }

  const submitVerification = async (status: 'verified' | 'rejected') => {
    if (!selectedCitizen) return

    try {
      await verifyCitizen({ 
        id: selectedCitizen.id, 
        verification_status: status,
        verification_notes: verificationNotes 
      })
      setIsVerifyDialogOpen(false)
      setSelectedCitizen(null)
      setVerificationNotes("")
    } catch (error) {
      console.error('Verification failed:', error)
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
          <h2 className="text-3xl font-bold tracking-tight">Local Leader Dashboard</h2>
          <p className="text-muted-foreground">
            Manage citizen verification and records
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

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All ({citizens.length})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          onClick={() => setFilter('pending')}
        >
          Pending ({pendingCount})
        </Button>
        <Button
          variant={filter === 'verified' ? 'default' : 'outline'}
          onClick={() => setFilter('verified')}
        >
          Verified ({verifiedCount})
        </Button>
      </div>

      {/* Citizen Verification Table */}
      <Card>
        <CardHeader>
          <CardTitle>Citizen Verification</CardTitle>
          <CardDescription>
            Review and verify citizen applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Citizen</TableHead>
                <TableHead>National ID</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCitizens.map((citizen) => (
                <TableRow key={citizen.id}>
                  <TableCell>
                    <div className="font-medium">{citizen.full_name}</div>
                    <div className="text-sm text-muted-foreground">{citizen.address}</div>
                  </TableCell>
                  <TableCell>{citizen.national_id}</TableCell>
                  <TableCell>{citizen.phone_number}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(citizen.verification_status)}>
                      {citizen.verification_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(citizen.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {citizen.verification_status === 'pending' && (
                      <Button
                        size="sm"
                        onClick={() => handleVerification(citizen)}
                      >
                        Review
                      </Button>
                    )}
                    {citizen.verification_status !== 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerification(citizen)}
                      >
                        View
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredCitizens.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No citizens found
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Dialog */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Citizen Verification</DialogTitle>
            <DialogDescription>
              Review citizen details and make verification decision
            </DialogDescription>
          </DialogHeader>
          
          {selectedCitizen && (
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {selectedCitizen.full_name}</div>
                    <div><strong>National ID:</strong> {selectedCitizen.national_id}</div>
                    <div><strong>Date of Birth:</strong> {new Date(selectedCitizen.date_of_birth).toLocaleDateString()}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Phone:</strong> {selectedCitizen.phone_number}</div>
                    <div><strong>Address:</strong> {selectedCitizen.address}</div>
                    <div><strong>Status:</strong> 
                      <Badge className={`ml-2 ${getStatusBadge(selectedCitizen.verification_status)}`}>
                        {selectedCitizen.verification_status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {selectedCitizen.verification_status === 'pending' && (
                <>
                  <div className="grid gap-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      Verification Notes
                    </label>
                    <Textarea
                      id="notes"
                      placeholder="Add notes about the verification decision..."
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                    />
                  </div>

                  <DialogFooter className="gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => submitVerification('rejected')}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Reject
                    </Button>
                    <Button
                      type="button"
                      onClick={() => submitVerification('verified')}
                    >
                      Verify
                    </Button>
                  </DialogFooter>
                </>
              )}

              {selectedCitizen.verification_status !== 'pending' && (
                <div>
                  <h4 className="font-semibold mb-2">Verification Details</h4>
                  <div className="text-sm">
                    <div><strong>Decision:</strong> {selectedCitizen.verification_status}</div>
                    {selectedCitizen.verification_notes && (
                      <div><strong>Notes:</strong> {selectedCitizen.verification_notes}</div>
                    )}
                    {selectedCitizen.verifier && (
                      <div><strong>Verified by:</strong> {selectedCitizen.verifier.name}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}