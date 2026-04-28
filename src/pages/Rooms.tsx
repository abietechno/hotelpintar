import { useState } from "react";
import { Filter, Calendar as CalIcon, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type RoomStatus = "AVAILABLE" | "OCCUPIED" | "MAINTENANCE";

interface Room {
  id: string;
  number: string;
  type: string;
  status: RoomStatus;
  guest?: string;
}

const generateRooms = (floor: number, count: number): Room[] => {
  return Array.from({ length: count }).map((_, i) => {
    const r = Math.random();
    let status: RoomStatus = "AVAILABLE";
    if (r > 0.6) status = "OCCUPIED";
    else if (r > 0.9) status = "MAINTENANCE";

    return {
      id: `${floor}${String(i + 1).padStart(2, "0")}`,
      number: `${floor}${String(i + 1).padStart(2, "0")}`,
      type: i % 5 === 0 ? "Suite" : i % 3 === 0 ? "Deluxe" : "Standard",
      status,
      guest: status === "OCCUPIED" ? "Guest Data" : undefined,
    };
  });
};

const initialFloors = [
  { level: 1, name: "1st Floor (Standard)", rooms: generateRooms(1, 12) },
  { level: 2, name: "2nd Floor (Deluxe)", rooms: generateRooms(2, 12) },
  { level: 3, name: "3rd Floor (Suite & Premium)", rooms: generateRooms(3, 8) },
];

export default function Rooms() {
  const [filter, setFilter] = useState<RoomStatus | "ALL">("ALL");
  const [floorsData, setFloorsData] = useState(initialFloors);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<{floorIndex: number, roomIndex: number} | null>(null);
  const [formData, setFormData] = useState<Room | null>(null);

  const handleEditRoom = (floorIndex: number, roomIndex: number, room: Room) => {
    setEditingRoom({ floorIndex, roomIndex });
    setFormData({ ...room });
    setIsDialogOpen(true);
  };

  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom || !formData) return;

    const newFloors = [...floorsData];
    newFloors[editingRoom.floorIndex].rooms[editingRoom.roomIndex] = formData;
    setFloorsData(newFloors);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Room Slots</h2>
          <p className="text-muted-foreground mt-1 text-sm">Live monitoring of room availability and status.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input 
              type="date" 
              className="h-9 pl-9 pr-3 w-[150px] text-xs font-medium bg-background border-input"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
            <CalIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          <Button size="sm" variant="outline">
            <Filter className="mr-2 w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSaveRoom}>
            <DialogHeader>
              <DialogTitle>Edit Room {formData?.number}</DialogTitle>
              <DialogDescription>
                Update room status, type or assign a guest.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input id="roomNumber" value={formData?.number || ""} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Room Type</Label>
                <Select 
                  value={formData?.type} 
                  onValueChange={(val) => formData && setFormData({...formData, type: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Deluxe">Deluxe</SelectItem>
                    <SelectItem value="Suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData?.status} 
                  onValueChange={(val: RoomStatus) => {
                    const updates = { ...formData!, status: val };
                    if (val !== "OCCUPIED") updates.guest = undefined;
                    else if (!updates.guest) updates.guest = "Walk-in Guest";
                    setFormData(updates);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Available</SelectItem>
                    <SelectItem value="OCCUPIED">Occupied</SelectItem>
                    <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData?.status === "OCCUPIED" && (
                <div className="space-y-2">
                  <Label htmlFor="guest">Guest Name</Label>
                  <Input 
                    id="guest" 
                    value={formData?.guest || ""} 
                    onChange={(e) => formData && setFormData({...formData, guest: e.target.value})} 
                    required 
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex flex-wrap items-center gap-2">
        <Badge 
          variant={filter === "ALL" ? "default" : "secondary"} 
          className="cursor-pointer font-medium" 
          onClick={() => setFilter("ALL")}
        >
          All
        </Badge>
        <Badge 
          variant={filter === "AVAILABLE" ? "default" : "secondary"} 
          className={cn("cursor-pointer font-medium")} 
          onClick={() => setFilter("AVAILABLE")}
        >
          Available
        </Badge>
        <Badge 
          variant={filter === "OCCUPIED" ? "default" : "secondary"} 
          className={cn("cursor-pointer font-medium")} 
          onClick={() => setFilter("OCCUPIED")}
        >
          Occupied
        </Badge>
        <Badge 
          variant={filter === "MAINTENANCE" ? "default" : "secondary"} 
          className={cn("cursor-pointer font-medium")} 
          onClick={() => setFilter("MAINTENANCE")}
        >
          Maintenance
        </Badge>
      </div>

      <div className="space-y-6">
        {floorsData.map((floor, floorIndex) => {
          const visibleRooms = floor.rooms.filter((r) => filter === "ALL" || r.status === filter);
          if (visibleRooms.length === 0) return null;

          return (
            <Card key={floor.level}>
              <CardHeader className="pb-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{floor.name}</CardTitle>
                  <CardDescription>{visibleRooms.length} Rooms</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {visibleRooms.map((room, visibleRoomIndex) => {
                    // We need original room index for editing
                    const roomIndex = floor.rooms.findIndex(r => r.id === room.id);
                    let bgClass = "bg-card border-border";
                    let textClass = "text-foreground";
                    let badgeClass = "bg-muted text-muted-foreground hover:bg-muted/80";
                    
                    if (room.status === "OCCUPIED") {
                      bgClass = "bg-card border-rose-500/50";
                      badgeClass = "bg-rose-500/10 text-rose-600 dark:text-rose-400";
                    } else if (room.status === "MAINTENANCE") {
                      bgClass = "bg-card border-amber-500/50";
                      badgeClass = "bg-amber-500/10 text-amber-600 dark:text-amber-400";
                    } else {
                      bgClass = "bg-card border-emerald-500/50";
                      badgeClass = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
                    }

                    return (
                      <div
                        key={room.id}
                        onClick={() => handleEditRoom(floorIndex, roomIndex, room)}
                        className={cn(
                          "relative flex flex-col p-4 rounded-xl border transition-all cursor-pointer hover:shadow-sm hover:border-primary",
                          bgClass
                        )}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className={cn("text-lg font-bold leading-none", textClass)}>{room.number}</span>
                          <div className={cn(
                            "w-2 h-2 rounded-full", 
                            room.status === 'AVAILABLE' ? 'bg-emerald-500' : room.status === 'OCCUPIED' ? 'bg-rose-500' : 'bg-amber-500'
                          )} />
                        </div>
                        <div className="mt-auto flex flex-col gap-1.5 items-start">
                          <Badge variant="secondary" className={cn("text-[10px] uppercase font-bold px-1.5 py-0", badgeClass)}>
                            {room.type === "Standard" ? "STD" : room.type === "Deluxe" ? "DLX" : "STE"}
                          </Badge>
                          <span className={cn("text-xs font-medium truncate text-muted-foreground w-full")}>
                            {room.status === 'OCCUPIED' ? room.guest : room.status.charAt(0) + room.status.slice(1).toLowerCase()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
