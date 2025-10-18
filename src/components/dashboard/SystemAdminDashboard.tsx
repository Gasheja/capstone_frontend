// components/dashboard/SystemAdminDashboard.tsx
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  IconUsers, 
  IconShield, 
  // IconSettings, 
  IconDotsVertical,
  IconUser,
  IconUserCheck,
  IconCalendar,
  IconPhone,
  IconMapPin,
  IconId,
  IconEye
} from "@tabler/icons-react"
import { useUsers } from "@/hooks/useUsers"
import { useCitizens } from "@/hooks/useCitizens"
import type { User, Citizen } from "@/types"
import { showToast } from "@/lib/utils"

export const SystemAdminDashboard: React.FC = () => {
  const { users, isLoading: usersLoading, updateUser, deleteUser } = useUsers()
  const { citizens, isLoading: citizensLoading, verifyCitizen } = useCitizens()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewCitizenDialogOpen, setIsViewCitizenDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("users")

  const stats = [
    { 
      title: "Total Users", 
      value: users.length.toString(), 
      description: "Across all roles", 
      icon: IconUsers 
    },
    { 
      title: "Total Citizens", 
      value: citizens.length.toString(), 
      description: "Registered citizens", 
      icon: IconUser 
    },
    { 
      title: "Verified Citizens", 
      value: citizens.filter(c => c.verification_status === 'verified').length.toString(), 
      description: "Successfully verified", 
      icon: IconUserCheck 
    },
    { 
      title: "Pending Verification", 
      value: citizens.filter(c => c.verification_status === 'pending').length.toString(), 
      description: "Awaiting review", 
      icon: IconShield 
    },
  ]

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCitizens = citizens.filter(citizen =>
    citizen.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    citizen.national_id.includes(searchTerm) ||
    citizen.phone_number.includes(searchTerm)
  )

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleViewCitizen = (citizen: Citizen) => {
    setSelectedCitizen(citizen)
    setIsViewCitizenDialogOpen(true)
  }

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId)
        showToast.success('User deleted successfully')
      } catch (error: any) {
        showToast.error(error.response?.data?.message || 'Failed to delete user')
      }
    }
  }

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return

    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
    }

    try {
      await updateUser({ id: selectedUser.id, ...data })
      showToast.success('User updated successfully')
      setIsEditDialogOpen(false)
      setSelectedUser(null)
    } catch (error: any) {
      showToast.error(error.response?.data?.message || 'Failed to update user')
    }
  }

  const handleVerifyCitizen = async (citizenId: number, status: 'verified' | 'rejected') => {
    try {
      await verifyCitizen({ 
        id: citizenId, 
        verification_status: status,
        verification_notes: `Verified by system administrator` 
      })
      showToast.success(`Citizen ${status} successfully`)
      setIsViewCitizenDialogOpen(false)
    } catch (error: any) {
      showToast.error(error.response?.data?.message || 'Verification failed')
    }
  }

  const getRoleBadge = (role: string) => {
    const roleColors = {
      system_admin: 'bg-red-100 text-red-800',
      local_leader: 'bg-blue-100 text-blue-800',
      policy_maker: 'bg-green-100 text-green-800',
      citizen: 'bg-gray-100 text-gray-800',
    }
    return roleColors[role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800'
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
          <h2 className="text-3xl font-bold tracking-tight">System Administration</h2>
          <p className="text-muted-foreground">
            Manage users, citizens, and system settings
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Tabs for Users and Citizens */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="citizens">Citizen Records</TabsTrigger>
            </TabsList>
            
            {/* Users Tab Content */}
            <TabsContent value="users" className="space-y-4">
              <CardDescription className="pt-4">
                Manage all system users and their permissions
              </CardDescription>
              <div className="flex items-center gap-4 pt-4">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </TabsContent>

            {/* Citizens Tab Content */}
            <TabsContent value="citizens" className="space-y-4">
              <CardDescription className="pt-4">
                View and manage all citizen records and verification status
              </CardDescription>
              <div className="flex items-center gap-4 pt-4">
                <Input
                  placeholder="Search citizens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          {/* Users Table */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadge(user.role)}>
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <IconDotsVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditUser(user)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {usersLoading ? 'Loading users...' : 'No users found'}
                </div>
              )}
            </div>
          )}

          {/* Citizens Table */}
          {activeTab === 'citizens' && (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Citizen</TableHead>
                    <TableHead>National ID</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCitizens.map((citizen) => (
                    <TableRow key={citizen.id}>
                      <TableCell>
                        <div className="font-medium">{citizen.full_name}</div>
                        <div className="text-sm text-muted-foreground">
                          User: {citizen.user?.name || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {citizen.national_id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <IconPhone className="h-3 w-3" />
                          {citizen.phone_number}
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
                          onClick={() => handleViewCitizen(citizen)}
                          variant="outline"
                        >
                          <IconEye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredCitizens.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {citizensLoading ? 'Loading citizens...' : 'No citizens found'}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and role.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateUser}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedUser?.name}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={selectedUser?.email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  defaultValue={selectedUser?.role}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="system_admin">System Administrator</option>
                  <option value="local_leader">Local Leader</option>
                  <option value="policy_maker">Policy Maker</option>
                  <option value="citizen">Citizen</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Citizen Dialog */}
      <Dialog open={isViewCitizenDialogOpen} onOpenChange={setIsViewCitizenDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Citizen Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedCitizen?.full_name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCitizen && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <IconUser className="h-4 w-4" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Full Name</span>
                      <span className="text-sm">{selectedCitizen.full_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <IconId className="h-3 w-3" />
                        National ID
                      </span>
                      <span className="text-sm font-mono">{selectedCitizen.national_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <IconCalendar className="h-3 w-3" />
                        Date of Birth
                      </span>
                      <span className="text-sm">
                        {new Date(selectedCitizen.date_of_birth).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <IconPhone className="h-4 w-4" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Phone Number</span>
                      <span className="text-sm">{selectedCitizen.phone_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Email</span>
                      <span className="text-sm">{selectedCitizen.user?.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Username</span>
                      <span className="text-sm">{selectedCitizen.user?.name || 'N/A'}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Address and Verification */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <IconMapPin className="h-4 w-4" />
                      Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedCitizen.address}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <IconUserCheck className="h-4 w-4" />
                      Verification Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Status</span>
                      <Badge className={getStatusBadge(selectedCitizen.verification_status)}>
                        {selectedCitizen.verification_status}
                      </Badge>
                    </div>
                    {selectedCitizen.verification_notes && (
                      <div>
                        <span className="text-sm font-medium block mb-1">Notes</span>
                        <p className="text-sm text-muted-foreground">
                          {selectedCitizen.verification_notes}
                        </p>
                      </div>
                    )}
                    {selectedCitizen.verifier && (
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Verified By</span>
                        <span className="text-sm">{selectedCitizen.verifier.name}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Registered</span>
                      <span className="text-sm">
                        {new Date(selectedCitizen.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Verification Actions for Pending Citizens */}
              {selectedCitizen.verification_status === 'pending' && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Verification Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleVerifyCitizen(selectedCitizen.id, 'verified')}
                        className="flex-1"
                      >
                        <IconUserCheck className="h-4 w-4 mr-1" />
                        Verify Citizen
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerifyCitizen(selectedCitizen.id, 'rejected')}
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Reject Application
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}