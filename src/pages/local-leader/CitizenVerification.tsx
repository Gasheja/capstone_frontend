// pages/local-leader/CitizenVerification.tsx
import React, { useState } from 'react'
import { Card, CardContent, 
    // CardDescription, 
    CardHeader,
    //  CardTitle 
    } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { IconUserCheck, IconSearch } from "@tabler/icons-react"
import { useCitizens } from "@/hooks/useCitizens"
import type { Citizen } from "@/types"
import { showToast } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const CitizenVerification: React.FC = () => {
  const { citizens, verifyCitizen } = useCitizens()
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null)
  const [verificationNotes, setVerificationNotes] = useState("")
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('pending')

  const pendingCitizens = citizens.filter(c => c.verification_status === 'pending')
  const filteredCitizens = citizens.filter(citizen => 
    (filter === 'all' || citizen.verification_status === filter) &&
    (citizen.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     citizen.national_id.includes(searchTerm))
  )

  const handleVerification = (citizen: Citizen) => {
    setSelectedCitizen(citizen)
    setVerificationNotes(citizen.verification_notes || "")
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
      showToast.success(`Citizen ${status} successfully`)
      setIsVerifyDialogOpen(false)
      setSelectedCitizen(null)
      setVerificationNotes("")
    } catch (error: any) {
      showToast.error(error.response?.data?.message || 'Verification failed')
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
              <h1 className="text-3xl font-bold tracking-tight">Citizen Verification</h1>
              <p className="text-muted-foreground">
                Review and verify citizen applications
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">{pendingCitizens.length}</div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </div>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant={filter === 'pending' ? 'default' : 'outline'}
                    onClick={() => setFilter('pending')}
                  >
                    Pending ({pendingCitizens.length})
                  </Button>
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilter('all')}
                  >
                    All ({citizens.length})
                  </Button>
                </div>
                <div className="relative w-full sm:w-auto">
                  <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search citizens..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full sm:w-64"
                  />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Citizen Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Citizen Details</TableHead>
                    <TableHead>National ID</TableHead>
                    <TableHead>Contact</TableHead>
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
                        <div className="text-sm text-muted-foreground">
                          DOB: {new Date(citizen.date_of_birth).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {citizen.national_id}
                      </TableCell>
                      <TableCell>
                        <div>{citizen.phone_number}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {citizen.address}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(citizen.verification_status)}>
                          {citizen.verification_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(citizen.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handleVerification(citizen)}
                          variant={citizen.verification_status === 'pending' ? 'default' : 'outline'}
                        >
                          {citizen.verification_status === 'pending' ? 'Review' : 'View'}
                        </Button>
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
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <div><strong>Name:</strong> {selectedCitizen.full_name}</div>
                        <div><strong>National ID:</strong> {selectedCitizen.national_id}</div>
                        <div><strong>Date of Birth:</strong> {new Date(selectedCitizen.date_of_birth).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">Contact Information</h4>
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
                          rows={3}
                        />
                      </div>

                      <DialogFooter className="gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => submitVerification('rejected')}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Reject Application
                        </Button>
                        <Button
                          type="button"
                          onClick={() => submitVerification('verified')}
                        >
                          <IconUserCheck className="h-4 w-4 mr-2" />
                          Verify Citizen
                        </Button>
                      </DialogFooter>
                    </>
                  )}

                  {selectedCitizen.verification_status !== 'pending' && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Verification Details</h4>
                      <div className="text-sm space-y-2">
                        <div><strong>Decision:</strong> 
                          <Badge className={`ml-2 ${getStatusBadge(selectedCitizen.verification_status)}`}>
                            {selectedCitizen.verification_status}
                          </Badge>
                        </div>
                        {selectedCitizen.verification_notes && (
                          <div><strong>Notes:</strong> {selectedCitizen.verification_notes}</div>
                        )}
                        {selectedCitizen.verifier && (
                          <div><strong>Verified by:</strong> {selectedCitizen.verifier.name}</div>
                        )}
                        <div><strong>Verified on:</strong> {new Date(selectedCitizen.updated_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default CitizenVerification