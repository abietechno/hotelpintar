import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Departments() {
  const departments = [
    { id: 1, name: "Front Office", head: "Sarah Jenkins", staff: 12, status: "Active" },
    { id: 2, name: "Housekeeping", head: "Budi Santoso", staff: 25, status: "Active" },
    { id: 3, name: "Food & Beverage", head: "Chef Juna", staff: 18, status: "Active" },
    { id: 4, name: "Maintenance", head: "Agus Riyanto", staff: 8, status: "Active" },
    { id: 5, name: "Finance", head: "Dina Mariana", staff: 4, status: "Active" },
  ];

  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Departments & Staff</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage hospitality departments, assign heads, and view staff allocation.</p>
        </div>
        <Button size="sm">
          <Plus className="mr-2 w-4 h-4" />
          Add Department
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px] pl-6">Department Name</TableHead>
                <TableHead>Head of Department</TableHead>
                <TableHead>Staff Count</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dep) => (
                <TableRow key={dep.id}>
                  <TableCell className="font-medium text-primary pl-6">{dep.name}</TableCell>
                  <TableCell className="text-muted-foreground">{dep.head}</TableCell>
                  <TableCell>{dep.staff} Members</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={dep.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : ''}>
                      {dep.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
