import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Building, Globe, Lock, Save, Share2, Upload, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function Settings() {
    const [showApiKey, setShowApiKey] = useState(false);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast({
                title: "Ayarlar Kaydedildi",
                description: "Tüm değişiklikler başarıyla güncellendi.",
            });
        }, 1000);
    };

    return (
        <>
            <Helmet>
                <title>Ayarlar - MedFlow AI</title>
            </Helmet>

            <div className="space-y-6 max-w-5xl mx-auto pb-10">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Klinik Ayarları</h1>
                    <p className="text-slate-600">Profil, entegrasyonlar ve genel yapılandırma.</p>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                        <TabsTrigger value="profile">Profil</TabsTrigger>
                        <TabsTrigger value="integration">Entegrasyon</TabsTrigger>
                        <TabsTrigger value="language">Dil & Bölge</TabsTrigger>
                        <TabsTrigger value="privacy">Gizlilik</TabsTrigger>
                    </TabsList>

                    {/* Clinic Profile Tab */}
                    <TabsContent value="profile" className="space-y-4 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Klinik Bilgileri</CardTitle>
                                <CardDescription>Klinik profilinizi ve iletişim bilgilerinizi yönetin.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="space-y-2">
                                        <Label>Logo</Label>
                                        <div className="w-32 h-32 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                                            <Avatar className="w-20 h-20 mb-2">
                                                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=DC" />
                                                <AvatarFallback>DC</AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs text-slate-500">Değiştir</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-4 w-full">
                                        <div className="grid gap-2">
                                            <Label htmlFor="clinicName">Klinik Adı</Label>
                                            <Input id="clinicName" defaultValue="Dental Clinic İstanbul" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="phone">Telefon</Label>
                                                <Input id="phone" defaultValue="+90 212 555 0000" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" defaultValue="info@dentalclinic.com" />
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="address">Adres</Label>
                                            <Textarea id="address" defaultValue="Bağdat Caddesi No:123, Kadıköy, İstanbul" className="h-20" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end border-t border-slate-100 pt-6">
                                <Button onClick={handleSave} disabled={loading}>
                                    {loading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                    Değişiklikleri Kaydet
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Integration Tab */}
                    <TabsContent value="integration" className="space-y-4 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Entegrasyonlar</CardTitle>
                                <CardDescription>Üçüncü parti servis bağlantıları.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* WhatsApp Section */}
                                <div className="border rounded-lg p-6 bg-white shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <Share2 className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900">WhatsApp Business API</h3>
                                                <p className="text-sm text-slate-500">Otomatik mesajlaşma ve bildirimler için.</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Bağlandı</Badge>
                                    </div>

                                    <div className="space-y-4 pl-[52px]">
                                        <div className="grid gap-2">
                                            <Label>API Anahtarı</Label>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <Input
                                                        type={showApiKey ? "text" : "password"}
                                                        defaultValue="sk_live_5123456789abcdefghijklmn"
                                                        readOnly
                                                        className="bg-slate-50 font-mono text-sm"
                                                    />
                                                </div>
                                                <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                                                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-slate-500 pt-2">
                                            <span className="flex items-center gap-2">
                                                <RefreshCw className="w-3 h-3" /> Son senkronizasyon: 10 dakika önce
                                            </span>
                                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                                Bağlantıyı Kes
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Language Tab */}
                    <TabsContent value="language" className="space-y-4 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Dil ve Bölge</CardTitle>
                                <CardDescription>Sistemin varsayılan dil ve bölge ayarları.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 max-w-xl">
                                    <div className="space-y-2">
                                        <Label>Varsayılan Dil</Label>
                                        <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                                            <option value="tr">Türkçe (TR)</option>
                                            <option value="en">English (US)</option>
                                            <option value="de">Deutsch (DE)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-3 pt-4">
                                        <Label>Desteklenen Diller</Label>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="lang-tr" defaultChecked disabled />
                                                <label htmlFor="lang-tr" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    Türkçe (Varsayılan)
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="lang-en" defaultChecked />
                                                <label htmlFor="lang-en" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    English
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="lang-ar" defaultChecked />
                                                <label htmlFor="lang-ar" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    Arabic
                                                </label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Checkbox id="lang-ru" />
                                                <label htmlFor="lang-ru" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    Russian
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end border-t border-slate-100 pt-6">
                                <Button onClick={handleSave}>Kaydet</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Privacy Tab */}
                    <TabsContent value="privacy" className="space-y-4 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gizlilik ve KVKK</CardTitle>
                                <CardDescription>Yasal metinler ve gizlilik politikaları.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>KVKK Aydınlatma Metni</Label>
                                    <Textarea className="h-32 text-xs" placeholder="KVKK metnini buraya yapıştırın..." defaultValue="6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Gizlilik Politikası</Label>
                                    <Textarea className="h-32 text-xs" placeholder="Gizlilik politikasını buraya yapıştırın..." defaultValue="Gizlilik politikamız..." />
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end border-t border-slate-100 pt-6">
                                <Button onClick={handleSave}>Kaydet</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

export default Settings;
