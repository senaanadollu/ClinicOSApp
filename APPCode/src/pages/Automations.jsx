import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Clock, MessageSquare, Zap, PlayCircle, PauseCircle, Edit2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const initialAutomations = [
    { id: 1, name: 'Randevu Onay', trigger: 'Randevu oluşturulduğunda', type: 'Event', active: true, channel: 'WhatsApp' },
    { id: 2, name: '24 Saat Hatırlatma', trigger: 'Randevudan 24 saat önce', type: 'Time', active: true, channel: 'WhatsApp' },
    { id: 3, name: 'No-Show Takip', trigger: 'Randevu durumu No-Show olduğunda', type: 'Event', active: false, channel: 'SMS' },
    { id: 4, name: '6 Ay Kontrol', trigger: 'Tedavi tamamlandıktan 6 ay sonra', type: 'Time', active: true, channel: 'Email' },
    { id: 5, name: 'Doğum Günü Kutlama', trigger: 'Lead doğum gününde', type: 'Date', active: true, channel: 'WhatsApp' },
    { id: 6, name: 'Lead Hoşgeldin', trigger: 'Yeni lead oluşturulduğunda', type: 'Event', active: true, channel: 'WhatsApp' },
    { id: 7, name: 'Yorum İsteği', trigger: 'Tedavi tamamlandıktan 2 gün sonra', type: 'Time', active: false, channel: 'SMS' },
    { id: 8, name: 'Upsell Kampanya', trigger: 'Tedavi tamamlandıktan 3 ay sonra', type: 'Time', active: false, channel: 'WhatsApp' },
];

function Automations() {
    const [automations, setAutomations] = useState(initialAutomations);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const { toast } = useToast();

    const handleToggle = (id) => {
        setAutomations(automations.map(auto =>
            auto.id === id ? { ...auto, active: !auto.active } : auto
        ));
        const auto = automations.find(a => a.id === id);
        toast({
            title: !auto.active ? "Otomasyon Aktifleştirildi" : "Otomasyon Durduruldu",
            description: `"${auto.name}" otomasyonu durumu güncellendi.`,
        });
    };

    const handleEdit = (auto) => {
        setEditingId(auto.id);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        setIsModalOpen(false);
        toast({
            title: "Başarılı",
            description: "Otomasyon ayarları kaydedildi.",
        });
    };

    const handleCreate = () => {
        setEditingId(null);
        setIsModalOpen(true);
    }

    return (
        <>
            <Helmet>
                <title>Otomasyonlar - MedFlow AI</title>
            </Helmet>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Otomasyonlar</h1>
                        <p className="text-slate-600">Hasta iletişiminizi otomatikleştirin ve zamandan tasarruf edin.</p>
                    </div>
                    <Button onClick={handleCreate}>
                        <Plus className="w-4 h-4 mr-2" />
                        Yeni Otomasyon
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {automations.map((auto) => (
                        <Card key={auto.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className={`p-2 rounded-lg ${auto.active ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <Switch
                                        checked={auto.active}
                                        onCheckedChange={() => handleToggle(auto.id)}
                                    />
                                </div>
                                <CardTitle className="text-lg mt-3">{auto.name}</CardTitle>
                                <CardDescription className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                    {auto.channel}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-3">
                                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-100">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{auto.trigger}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button variant="ghost" size="sm" className="w-full" onClick={() => handleEdit(auto)}>
                                    <Edit2 className="w-3 h-3 mr-2" />
                                    Düzenle
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingId ? 'Otomasyonu Düzenle' : 'Yeni Otomasyon Oluştur'}</DialogTitle>
                            <DialogDescription>
                                Otomasyon tetikleyicilerini ve mesaj şablonlarını yapılandırın.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto px-1">
                            {/* Basic Info */}
                            <div className="grid gap-2">
                                <Label htmlFor="name">Otomasyon İsmi</Label>
                                <Input id="name" defaultValue="Yeni Otomasyon" placeholder="Örn: Randevu Hatırlatma" />
                            </div>

                            {/* Trigger Config */}
                            <div className="border rounded-lg p-4 space-y-4 bg-slate-50">
                                <h4 className="font-medium text-sm text-slate-900 flex items-center gap-2">
                                    <Zap className="w-4 h-4" /> Tetikleyici Ayarları
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Tetikleyici Tipi</Label>
                                        <Select defaultValue="time">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="time">Zaman Bazlı</SelectItem>
                                                <SelectItem value="stage">Aşama Bazlı</SelectItem>
                                                <SelectItem value="event">Olay Bazlı</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Zamanlama</Label>
                                        <Input placeholder="Örn: 24 saat önce" defaultValue="24 saat önce" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Funnel Aşamaları</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Aşamaları seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Tümü</SelectItem>
                                            <SelectItem value="lead">Lead</SelectItem>
                                            <SelectItem value="appointment">Randevu</SelectItem>
                                            <SelectItem value="treatment">Tedavi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Message Template */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-sm text-slate-900 flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" /> Mesaj Şablonu
                                    </h4>
                                    <Select defaultValue="whatsapp">
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                            <SelectItem value="sms">SMS</SelectItem>
                                            <SelectItem value="email">Email</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Tabs defaultValue="tr" className="w-full">
                                    <TabsList className="w-full grid grid-cols-4">
                                        <TabsTrigger value="tr">Türkçe</TabsTrigger>
                                        <TabsTrigger value="en">English</TabsTrigger>
                                        <TabsTrigger value="ar">Arabic</TabsTrigger>
                                        <TabsTrigger value="ru">Russian</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="tr" className="pt-4">
                                        <Textarea
                                            placeholder="Mesaj şablonunuzu buraya yazın..."
                                            className="h-32"
                                            defaultValue="Sayın {isim}, {tarih} tarihindeki randevunuzu hatırlatmak isteriz. Lütfen onaylamak için EVET yazınız."
                                        />
                                        <p className="text-xs text-slate-500 mt-2">Kullanılabilir değişkenler: {'{isim}'}, {'{tarih}'}, {'{saat}'}, {'{doktor}'}</p>
                                    </TabsContent>
                                    <TabsContent value="en" className="pt-4">
                                        <Textarea
                                            placeholder="Type your message template here..."
                                            className="h-32"
                                            defaultValue="Dear {name}, this is a reminder for your appointment on {date}. Please reply YES to confirm."
                                        />
                                    </TabsContent>
                                    <TabsContent value="ar" className="pt-4">
                                        <Textarea placeholder="Template in Arabic..." className="h-32" />
                                    </TabsContent>
                                    <TabsContent value="ru" className="pt-4">
                                        <Textarea placeholder="Template in Russian..." className="h-32" />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>İptal</Button>
                            <Button onClick={handleSave}>
                                <Save className="w-4 h-4 mr-2" />
                                Kaydet
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

export default Automations;