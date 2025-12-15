import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Calendar as CalendarIcon, List, Clock, MoreHorizontal,
    MapPin, User, ChevronLeft, ChevronRight, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

// Mock Appointments Data
const appointments = [
    { id: 1, lead: 'Ahmet Yılmaz', service: 'Diş Beyazlatma', date: '2023-12-20', time: '09:00', status: 'Onaylandı', doctor: 'Dr. Ali' },
    { id: 2, lead: 'Ayşe Demir', service: 'İmplant Muayene', date: '2023-12-20', time: '10:30', status: 'Planlandı', doctor: 'Dr. Zeynep' },
    { id: 3, lead: 'Mehmet Kaya', service: 'Kanal Tedavisi', date: '2023-12-20', time: '14:00', status: 'Tamamlandı', doctor: 'Dr. Ali' },
    { id: 4, lead: 'Fatma Çelik', service: 'Genel Kontrol', date: '2023-12-21', time: '11:00', status: 'No-Show', doctor: 'Dr. Zeynep' },
    { id: 5, lead: 'Can Yıldız', service: 'Dolgu', date: '2023-12-21', time: '15:30', status: 'Planlandı', doctor: 'Dr. Ali' },
    { id: 6, lead: 'Zeynep Su', service: 'Diş Taşı Temizliği', date: '2023-12-22', time: '09:30', status: 'Onaylandı', doctor: 'Dr. Zeynep' },
];

const statusStyles = {
    'Planlandı': 'bg-blue-100 text-blue-700 border-blue-200',
    'Onaylandı': 'bg-green-100 text-green-700 border-green-200',
    'No-Show': 'bg-red-100 text-red-700 border-red-200',
    'Tamamlandı': 'bg-slate-100 text-slate-700 border-slate-200',
};

function Appointments() {
    const [view, setView] = useState('list'); // 'calendar' or 'list'
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { toast } = useToast();

    const handleCreateAppointment = (e) => {
        e.preventDefault();
        setIsCreateModalOpen(false);
        toast({
            title: "Randevu Oluşturuldu",
            description: "Yeni randevu başarıyla takvime eklendi."
        });
    };

    return (
        <>
            <Helmet>
                <title>Randevular - MedFlow AI</title>
            </Helmet>

            <div className="space-y-6">
                {/* Header & Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Randevu Takvimi</h1>
                        <p className="text-slate-600">Klinik randevularını yönetin ve planlayın.</p>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
                        <Button
                            variant={view === 'calendar' ? 'white' : 'ghost'}
                            size="sm"
                            className={view === 'calendar' ? 'bg-white shadow-sm' : ''}
                            onClick={() => setView('calendar')}
                        >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            Takvim
                        </Button>
                        <Button
                            variant={view === 'list' ? 'white' : 'ghost'}
                            size="sm"
                            className={view === 'list' ? 'bg-white shadow-sm' : ''}
                            onClick={() => setView('list')}
                        >
                            <List className="w-4 h-4 mr-2" />
                            Liste
                        </Button>
                    </div>

                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Yeni Randevu
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Yeni Randevu Oluştur</DialogTitle>
                                <DialogDescription>
                                    Hasta ve randevu detaylarını girerek yeni bir randevu oluşturun.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateAppointment} className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="lead">Hasta Adı</Label>
                                    <Input id="lead" placeholder="Hasta adı arayın..." />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Tarih</Label>
                                        <Input id="date" type="date" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="time">Saat</Label>
                                        <Input id="time" type="time" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="service">Hizmet</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Hizmet seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="muayene">Genel Muayene</SelectItem>
                                            <SelectItem value="implant">İmplant Tedavisi</SelectItem>
                                            <SelectItem value="beyazlatma">Diş Beyazlatma</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notlar</Label>
                                    <Textarea id="notes" placeholder="Randevu notları..." />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Oluştur</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Calendar View */}
                {view === 'calendar' && (
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <h2 className="text-lg font-semibold text-slate-900">Aralık 2023</h2>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span>Planlandı</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span>Onaylandı</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span>No-Show</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-8 border-t border-l border-slate-200">
                            {/* Header Row */}
                            <div className="p-4 border-b border-r border-slate-200 bg-slate-50 font-medium text-slate-500 text-sm text-center">Saat</div>
                            {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                                <div key={day} className="p-4 border-b border-r border-slate-200 bg-slate-50 font-medium text-slate-900 text-sm text-center">
                                    {day}
                                </div>
                            ))}

                            {/* Time Slots Mockup - Just a few rows for visual demo */}
                            {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => (
                                <React.Fragment key={time}>
                                    <div className="p-3 border-b border-r border-slate-200 text-xs text-slate-500 text-center">{time}</div>
                                    {Array(7).fill(null).map((_, i) => (
                                        <div key={i} className="p-1 border-b border-r border-slate-200 h-24 relative hover:bg-slate-50 transition-colors group">
                                            {/* Random Mock Appointments Placement */}
                                            {(i === 2 && time === '09:00') && (
                                                <div className="absolute inset-1 bg-blue-100 border-l-4 border-blue-500 rounded p-1 text-xs overflow-hidden cursor-pointer hover:shadow-md transition-all">
                                                    <div className="font-bold text-blue-900">Ahmet Yılmaz</div>
                                                    <div className="text-blue-700 truncate">İmplant Görüşme</div>
                                                </div>
                                            )}
                                            {(i === 3 && time === '14:00') && (
                                                <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded p-1 text-xs overflow-hidden cursor-pointer hover:shadow-md transition-all">
                                                    <div className="font-bold text-green-900">Ayşe Demir</div>
                                                    <div className="text-green-700 truncate">Kontrol</div>
                                                </div>
                                            )}
                                            {(i === 4 && time === '11:00') && (
                                                <div className="absolute inset-1 bg-red-100 border-l-4 border-red-500 rounded p-1 text-xs overflow-hidden cursor-pointer hover:shadow-md transition-all">
                                                    <div className="font-bold text-red-900">Mehmet K.</div>
                                                    <div className="text-red-700 truncate">Dolgu</div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}

                {/* List View */}
                {view === 'list' && (
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-200 flex gap-4">
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Durum Filtresi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tümü</SelectItem>
                                    <SelectItem value="planned">Planlandı</SelectItem>
                                    <SelectItem value="confirmed">Onaylandı</SelectItem>
                                    <SelectItem value="completed">Tamamlandı</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative flex-1 max-w-xs">
                                <Input type="date" className="w-full" />
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Lead Adı</TableHead>
                                    <TableHead>Tarih/Saat</TableHead>
                                    <TableHead>Doktor</TableHead>
                                    <TableHead>Hizmet</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead className="text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((apt) => (
                                    <TableRow key={apt.id} className="hover:bg-slate-50">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                                                    {apt.lead.substring(0, 2).toUpperCase()}
                                                </div>
                                                {apt.lead}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-sm">
                                                <span className="font-medium text-slate-900">{apt.date}</span>
                                                <span className="text-slate-500">{apt.time}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-600">{apt.doctor}</TableCell>
                                        <TableCell className="text-slate-600">{apt.service}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`${statusStyles[apt.status]}`}>
                                                {apt.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </>
    );
}

export default Appointments;