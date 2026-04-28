import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Shield, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Represents the data structure intended for the Golang backend
interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Staff";
  status: "Active" | "Inactive";
  createdAt: string;
}

export default function UserSettings() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Staff" as AppUser["role"],
    password: "", // Only sent on create or if changed on edit
  });

  // Mock fetching data from Golang backend GET /api/v1/users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call: const response = await fetch('/api/v1/users');
        // const data = await response.json();

        // Mock connection delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        setUsers([
          {
            id: "1",
            name: "Admin User",
            email: "admin@toscaerp.com",
            role: "Admin",
            status: "Active",
            createdAt: "2026-01-10T10:00:00Z",
          },
          {
            id: "2",
            name: "Sarah Jenkins",
            email: "sarah.j@toscaerp.com",
            role: "Manager",
            status: "Active",
            createdAt: "2026-02-15T09:30:00Z",
          },
          {
            id: "3",
            name: "Budi Santoso",
            email: "budi.s@toscaerp.com",
            role: "Staff",
            status: "Inactive",
            createdAt: "2026-03-20T14:45:00Z",
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const resetForm = () => {
    setFormData({ name: "", email: "", role: "Staff", password: "" });
    setEditingId(null);
  };

  const handleOpenDialog = (user?: AppUser) => {
    if (user) {
      setEditingId(user.id);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        password: "", // don't load password when editing
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with actual API call
    // if (editingId) {
    //   await fetch(`/api/v1/users/${editingId}`, { method: 'PUT', body: JSON.stringify(formData) });
    // } else {
    //   await fetch(`/api/v1/users`, { method: 'POST', body: JSON.stringify(formData) });
    // }

    // Optimistic UI updates for the Mock
    if (editingId) {
      setUsers(
        users.map((u) =>
          u.id === editingId
            ? {
                ...u,
                name: formData.name,
                email: formData.email,
                role: formData.role,
              }
            : u,
        ),
      );
    } else {
      const newUser: AppUser = {
        id: Math.random().toString(36).substring(7),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: "Active",
        createdAt: new Date().toISOString(),
      };
      setUsers([...users, newUser]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    // Replace with actual API call
    // await fetch(`/api/v1/users/${id}`, { method: 'DELETE' });

    setUsers(users.filter((u) => u.id !== id));
  };

  const toggleStatus = async (user: AppUser) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    // await fetch(`/api/v1/users/${user.id}/status`, { method: 'PUT', body: JSON.stringify({ status: newStatus }) });
    setUsers(
      users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)),
    );
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users & Roles</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage system access, define roles, and create user accounts.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3"
            onClick={() => handleOpenDialog()}
          >
            <Plus className="mr-2 w-4 h-4" />
            Add New User
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit User" : "Create New User"}
                </DialogTitle>
                <DialogDescription>
                  {editingId
                    ? "Update user details and role."
                    : "Fill in the details to invite a new user."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(val: AppUser["role"]) =>
                      setFormData({ ...formData, role: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Administrator</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {editingId ? "New Password (Optional)" : "Password"}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required={!editingId}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingId ? "Save Changes" : "Create User"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6 w-[250px]">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm text-foreground">
                            {user.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {user.role === "Admin" && (
                          <Shield className="w-3.5 h-3.5 text-primary" />
                        )}
                        <span className="text-sm">{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`cursor-pointer ${user.status === "Active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : ""}`}
                        onClick={() => toggleStatus(user)}
                        title="Click to toggle status"
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-primary hover:text-primary"
                          onClick={() => handleOpenDialog(user)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 pt-4 border-t border-border/50">
        <h3 className="text-sm font-semibold mb-2">
          Developer Integration Note:
        </h3>
        <p className="text-xs text-muted-foreground mb-4 max-w-3xl leading-relaxed">
          This CRUD interface is prepared for a Golang backend. You can replace
          the mocked API endpoints inside{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-primary">
            src/pages/UserSettings.tsx
          </code>{" "}
          with standard{" "}
          <code className="bg-muted px-1 py-0.5 rounded">fetch</code> or{" "}
          <code className="bg-muted px-1 py-0.5 rounded">axios</code> calls. The
          endpoints map to RESTful standards e.g.,{" "}
          <code className="bg-muted px-1 py-0.5 rounded">
            GET /api/v1/users
          </code>
          ,{" "}
          <code className="bg-muted px-1 py-0.5 rounded">
            POST /api/v1/users
          </code>
          ,{" "}
          <code className="bg-muted px-1 py-0.5 rounded">
            PUT /api/v1/users/:id
          </code>
          , and{" "}
          <code className="bg-muted px-1 py-0.5 rounded">
            DELETE /api/v1/users/:id
          </code>
          .
        </p>
      </div>
    </div>
  );
}
