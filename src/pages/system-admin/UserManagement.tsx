// pages/system-admin/UserManagement.tsx
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
import {
    //  IconUsers, 
     IconPlus, IconDotsVertical, IconSearch } from "@tabler/icons-react"
import { useUsers } from "@/hooks/useUsers"
import type { User } from "@/types"
import { showToast } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const UserManagement: React.FC = () => {
  const { users, isLoading, updateUser, deleteUser, createUser } = useUsers()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      role: formData.get('role') as string,
    }

    try {
      await createUser(data)
      showToast.success('User created successfully')
      setIsCreateDialogOpen(false)
    } catch (error: any) {
      showToast.error(error.response?.data?.message || 'Failed to create user')
    }
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
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

  const getRoleBadge = (role: string) => {
    const roleColors = {
      system_admin: 'bg-red-100 text-red-800',
      local_leader: 'bg-blue-100 text-blue-800',
      policy_maker: 'bg-green-100 text-green-800',
      citizen: 'bg-gray-100 text-gray-800',
    }
    return roleColors[role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
              <p className="text-muted-foreground">
                Manage all system users and their permissions
              </p>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <IconPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
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
                  {isLoading ? 'Loading users...' : 'No users found'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Create User Dialog */}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Add a new user to the system with appropriate role.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="create-name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="create-name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="create-email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="create-email"
                      name="email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="create-password" className="text-sm font-medium">
                      Password
                    </label>
                    <Input
                      id="create-password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="create-role" className="text-sm font-medium">
                      Role
                    </label>
                    <select
                      id="create-role"
                      name="role"
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
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create User</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

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
                    <label htmlFor="edit-name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="edit-name"
                      name="name"
                      defaultValue={selectedUser?.name}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="edit-email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="edit-email"
                      name="email"
                      type="email"
                      defaultValue={selectedUser?.email}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="edit-role" className="text-sm font-medium">
                      Role
                    </label>
                    <select
                      id="edit-role"
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default UserManagement