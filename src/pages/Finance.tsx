import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Finance() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Reports</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage revenue, transactions, and generate reports.</p>
        </div>
        <Button size="sm">
          <Download className="mr-2 w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Guest/Company</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "TRX-1092", date: "24 Oct 2026", name: "Bpk. Budi Santoso", amount: 1500000, status: "Completed" },
                { id: "TRX-1093", date: "24 Oct 2026", name: "Agoda Booking", amount: 4200000, status: "Completed" },
                { id: "TRX-1094", date: "23 Oct 2026", name: "Traveloka ID99", amount: 850000, status: "Pending" },
                { id: "TRX-1095", date: "23 Oct 2026", name: "Ibu Siti", amount: 2100000, status: "Completed" },
                { id: "TRX-1096", date: "22 Oct 2026", name: "Corporate Event PT Maju", amount: 15500000, status: "Completed" },
              ].map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium text-primary">{tx.id}</TableCell>
                  <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                  <TableCell>{tx.name}</TableCell>
                  <TableCell className="font-semibold">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(tx.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'}>
                      {tx.status}
                    </Badge>
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
