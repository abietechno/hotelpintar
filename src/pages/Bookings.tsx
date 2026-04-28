import { useState } from "react";
import { Download, Filter, Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Status = "Confirmed" | "Checked In" | "Checked Out" | "Pending";

interface Booking {
  id: string;
  guest: string;
  phone?: string;
  email?: string;
  address?: string;
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
  room: string;
  dates: string;
  source: string;
  status: Status;
  amount: string;
}

const initialBookings: Booking[] = [
  { id: "BKG-2039", guest: "John Doe", room: "Deluxe (302)", dates: "24 Oct - 26 Oct", source: "Agoda", status: "Confirmed", amount: "Rp 5.100.000" },
  { id: "BKG-2040", guest: "Sarah Smith", room: "Suite (401)", dates: "24 Oct - 25 Oct", source: "Website", status: "Checked In", amount: "Rp 7.500.000" },
  { id: "BKG-2041", guest: "Michael Lee", room: "Standard (105)", dates: "25 Oct - 28 Oct", source: "Booking.com", status: "Pending", amount: "Rp 3.150.000" },
  { id: "BKG-2042", guest: "Emma Davis", room: "Standard (204)", dates: "26 Oct - 27 Oct", source: "Website", status: "Confirmed", amount: "Rp 1.800.000" },
  { id: "BKG-2043", guest: "Robert Wilson", room: "Deluxe (305)", dates: "22 Oct - 24 Oct", source: "Expedia", status: "Checked Out", amount: "Rp 6.750.000" },
];

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Booking, "id">>({
    guest: "",
    phone: "",
    email: "",
    address: "",
    roomType: "Standard",
    checkIn: "",
    checkOut: "",
    room: "",
    dates: "",
    source: "Website",
    status: "Pending",
    amount: "",
  });

  const handleOpenDialog = (booking?: Booking) => {
    if (booking) {
      setEditingId(booking.id);
      setFormData({
        guest: booking.guest,
        phone: booking.phone || "",
        email: booking.email || "",
        address: booking.address || "",
        roomType: booking.roomType || "Standard",
        checkIn: booking.checkIn || "",
        checkOut: booking.checkOut || "",
        room: booking.room,
        dates: booking.dates,
        source: booking.source,
        status: booking.status,
        amount: booking.amount,
      });
    } else {
      setEditingId(null);
      setFormData({
        guest: "",
        phone: "",
        email: "",
        address: "",
        roomType: "Standard",
        checkIn: "",
        checkOut: "",
        room: "",
        dates: "",
        source: "Website",
        status: "Pending",
        amount: "",
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDates = `${formData.checkIn} - ${formData.checkOut}`;
    const submitData = { ...formData, dates: formattedDates };

    if (editingId) {
      setBookings(bookings.map(b => b.id === editingId ? { ...submitData, id: editingId } : b));
    } else {
      const newId = `BKG-${Math.floor(2000 + Math.random() * 900)}`;
      setBookings([{ ...submitData, id: newId }, ...bookings]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    setBookings(bookings.filter(b => b.id !== id));
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 border-none">
        <div>
          <h2 className="text-3xl font-bold tracking-tight dark:text-white">Bookings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Monitor OTA and direct website reservations.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 w-4 h-4" />
            Export CSV
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3" onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 w-4 h-4" />
              New Booking
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{editingId ? "Edit Booking" : "New Booking"}</DialogTitle>
                  <DialogDescription>
                    {editingId ? "Update existing booking details." : "Create a new booking manually."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                  <div className="space-y-2">
                    <Label htmlFor="guest">Guest Name</Label>
                    <Input id="guest" value={formData.guest} onChange={e => setFormData({...formData, guest: e.target.value})} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomType">Room Type</Label>
                      <Select value={formData.roomType} onValueChange={(val) => setFormData({...formData, roomType: val})}>
                        <SelectTrigger><SelectValue placeholder="Room Type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Deluxe">Deluxe</SelectItem>
                          <SelectItem value="Suite">Suite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room">Room Number</Label>
                      <Input id="room" placeholder="e.g. Deluxe (302)" value={formData.room} onChange={e => setFormData({...formData, room: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">Check-In Date</Label>
                      <Input id="checkIn" type="date" value={formData.checkIn} onChange={e => setFormData({...formData, checkIn: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkOut">Check-Out Date</Label>
                      <Input id="checkOut" type="date" value={formData.checkOut} onChange={e => setFormData({...formData, checkOut: e.target.value})} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="source">Source</Label>
                      <Select value={formData.source} onValueChange={(val) => setFormData({...formData, source: val})}>
                        <SelectTrigger><SelectValue placeholder="Source" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Walk-in">Walk-in</SelectItem>
                          <SelectItem value="Phone">Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(val: Status) => setFormData({...formData, status: val})}>
                        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Checked In">Checked In</SelectItem>
                          <SelectItem value="Checked Out">Checked Out</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Total Amount</Label>
                    <Input id="amount" placeholder="e.g. Rp 4.500.000" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">{editingId ? "Save Changes" : "Create Booking"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Direct Website</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">382</div>
            <p className="text-xs text-muted-foreground">+4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OTA Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">863</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancellations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">24</div>
            <p className="text-xs text-muted-foreground">-2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Recent Reservations</CardTitle>
              <CardDescription>A list of recent bookings from all channels.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Search guest name..." className="w-[200px] h-8" />
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px] h-8">
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="agoda">Agoda</SelectItem>
                  <SelectItem value="booking">Booking.com</SelectItem>
                  <SelectItem value="expedia">Expedia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] pl-6">Booking ID</TableHead>
                <TableHead>Guest Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium text-primary pl-6">{booking.id}</TableCell>
                  <TableCell>{booking.guest}</TableCell>
                  <TableCell>{booking.room}</TableCell>
                  <TableCell className="text-muted-foreground">{booking.dates}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal text-muted-foreground">
                      {booking.source}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{booking.amount}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={
                        booking.status === 'Checked In' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 
                        booking.status === 'Confirmed' ? 'bg-primary/10 text-primary border-primary/20' :
                        booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' : ''
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary" onClick={() => handleOpenDialog(booking)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(booking.id)}>
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
