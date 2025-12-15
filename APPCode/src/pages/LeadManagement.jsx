import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Search, Filter, MoreHorizontal, Phone, Mail,
    MessageSquare, Calendar, ChevronRight, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';

// Mock Data
const leadsData = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: ['Ahmet Yılmaz', 'Ayşe Demir', 'Mehmet Kaya', 'Fatma Çelik', 'Ali Yıldız'][i % 5] + ` ${i + 1}`,
    email: `user${i}@example.com`,
    phone: `+90 555 ${100 + i} 22 33`,
    channel: ['WhatsApp', 'SMS', 'Web'][i % 3],
    language: ['TR', 'EN', 'DE'][i % 3],
    stage: ['Lead', 'Qualified', 'Randevu', 'Tedavi', 'Upsell'][i % 5],
    score: Math.floor(Math.random() * 60) + 40,
    lastContact: `${Math.floor(Math.random() * 5) + 1} gün önce`,
    notes: "Hasta implant tedavisi ile ilgileniyor. Fiyat bilgisi istedi.",
    appointments: [
        { date: '2023-12-20', type: 'Ön Görüşme', status: 'Tamamlandı' },
        { date: '2023-12-25', type: 'Muayene', status: 'Planlandı' }
    ]
}));

const stageColors = {
    'Lead': 'bg-slate-100 text-slate-600',
    'Qualified': 'bg-blue-100 text-blue-600',
    'Randevu': 'bg-purple-100 text-purple-600',
    'Tedavi': 'bg-green-100 text-green-600',
    'Upsell': 'bg-orange-100 text-orange-600'
};

const channelIcons = {
    'WhatsApp': <MessageSquare className="w-4 h-4 text-green-600" />,
    'SMS': <MessageSquare className="w-4 h-4 text-blue-600" />,
    'Web': <Mail className="w-4 h-4 text-orange-600" />
};

function LeadManagement() {
    const [selectedLead, setSelectedLead] = useState(null);
    const { toast } = useToast();

    const handleAction = (action) => {
        toast({
            title: "İşlem Başarılı",
            description: `${action} işlemi başarıyla gerçekleştirildi.`
        });
    };

    return (
        <>
            <Helmet>
                <title>Lead Yönetimi - MedFlow AI</title>
            </Helmet>

            <div className="space-y-6 h-full flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Lead Yönetimi</h1>
                        <p className="text-slate-600">Potansiyel müşterilerinizi takip edin ve yönetin.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Filter className="w-4 h-4 mr-2" />
                            Filtrele
                        </Button>
                        <Button onClick={() => handleAction("Lead Ekleme")}>
                            + Yeni Lead
                        </Button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap gap-4 items-center">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input placeholder="İsim, telefon veya e-posta ara..." className="pl-9" />
                    </div>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Funnel Aşaması" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tüm Aşamalar</SelectItem>
                            <SelectItem value="lead">Lead</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="appointment">Randevu</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Dil" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tüm Diller</SelectItem>
                            <SelectItem value="tr">Türkçe</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Leads Table */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>İsim</TableHead>
                                    <TableHead>Kanal</TableHead>
                                    <TableHead>Dil</TableHead>
                                    <TableHead>Aşama</TableHead>
                                    <TableHead>Lead Skoru</TableHead>
                                    <TableHead>Son Temas</TableHead>
                                    <TableHead className="text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leadsData.map((lead) => (
                                    <TableRow key={lead.id} className="cursor-pointer hover:bg-slate-50" onClick={() => setSelectedLead(lead)}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                                                    {lead.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="text-slate-900">{lead.name}</div>
                                                    <div className="text-xs text-slate-500">{lead.phone}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {channelIcons[lead.channel]}
                                                <span className="text-sm text-slate-600">{lead.channel}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-slate-600 border-slate-300">
                                                {lead.language}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`${stageColors[lead.stage]} hover:${stageColors[lead.stage]} border-0`}>
                                                {lead.stage}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="w-[150px]">
                                            <div className="flex items-center gap-2">
                                                <Progress value={lead.score} className="h-2" />
                                                <span className="text-xs font-medium text-slate-600">{lead.score}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-600 text-sm">
                                            {lead.lastContact}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedLead(lead);
                                                    }}>
                                                        <ChevronRight className="w-4 h-4 text-slate-400" />
                                                    </Button>
                                                </SheetTrigger>
                                                <SheetContent className="overflow-y-auto">
                                                    <SheetHeader>
                                                        <SheetTitle>Lead Detayları</SheetTitle>
                                                        <SheetDescription>
                                                            Seçilen lead hakkındaki tüm bilgiler ve geçmiş etkileşimler.
                                                        </SheetDescription>
                                                    </SheetHeader>

                                                    {selectedLead && (
                                                        <div className="mt-6 space-y-6">
                                                            {/* Profile Header */}
                                                            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                                                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                                                                    {selectedLead.name.substring(0, 2).toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <h3 className="text-lg font-bold text-slate-900">{selectedLead.name}</h3>
                                                                    <div className="flex flex-col gap-1 text-sm text-slate-500 mt-1">
                                                                        <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> {selectedLead.phone}</span>
                                                                        <span className="flex items-center gap-2"><Mail className="w-3 h-3" /> {selectedLead.email}</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Stats Grid */}
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                                    <div className="text-xs text-slate-500 mb-1">Lead Skoru</div>
                                                                    <div className="text-xl font-bold text-slate-900">{selectedLead.score}</div>
                                                                </div>
                                                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                                    <div className="text-xs text-slate-500 mb-1">Dil</div>
                                                                    <div className="text-xl font-bold text-slate-900">{selectedLead.language}</div>
                                                                </div>
                                                            </div>

                                                            {/* Action Buttons */}
                                                            <div className="flex gap-2">
                                                                <Button className="flex-1" onClick={() => handleAction("Randevu Oluştur")}>
                                                                    <Calendar className="w-4 h-4 mr-2" />
                                                                    Randevu
                                                                </Button>
                                                                <Button variant="outline" className="flex-1" onClick={() => handleAction("Aşama Güncelle")}>
                                                                    Aşama
                                                                </Button>
                                                            </div>

                                                            {/* Notes Section */}
                                                            <div className="space-y-2">
                                                                <h4 className="text-sm font-semibold text-slate-900">Notlar</h4>
                                                                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 text-sm text-slate-700">
                                                                    {selectedLead.notes}
                                                                </div>
                                                                <Button variant="ghost" size="sm" className="w-full text-slate-500 h-8" onClick={() => handleAction("Not Ekle")}>
                                                                    + Not Ekle
                                                                </Button>
                                                            </div>

                                                            {/* Past Appointments */}
                                                            <div className="space-y-3">
                                                                <h4 className="text-sm font-semibold text-slate-900">Randevu Geçmişi</h4>
                                                                {selectedLead.appointments.map((apt, idx) => (
                                                                    <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                                                                                <Calendar className="w-4 h-4" />
                                                                            </div>
                                                                            <div>
                                                                                <div className="text-sm font-medium text-slate-900">{apt.type}</div>
                                                                                <div className="text-xs text-slate-500">{apt.date}</div>
                                                                            </div>
                                                                        </div>
                                                                        <Badge variant="secondary" className="text-xs font-normal">
                                                                            {apt.status}
                                                                        </Badge>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </SheetContent>
                                            </Sheet>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LeadManagement;