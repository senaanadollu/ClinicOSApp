import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, FunnelChart, Funnel, LabelList } from 'recharts';
import { Calendar, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock Data
const funnelData = [
    { name: 'Lead', value: 1200, fill: '#3b82f6' },
    { name: 'Qualified', value: 800, fill: '#60a5fa' },
    { name: 'Randevu', value: 500, fill: '#93c5fd' },
    { name: 'Tedavi', value: 300, fill: '#2563eb' },
];

const channelData = [
    { name: 'Ocak', WhatsApp: 400, SMS: 240, Web: 240 },
    { name: 'Şubat', WhatsApp: 300, SMS: 139, Web: 221 },
    { name: 'Mart', WhatsApp: 200, SMS: 980, Web: 229 },
    { name: 'Nisan', WhatsApp: 278, SMS: 390, Web: 200 },
    { name: 'Mayıs', WhatsApp: 189, SMS: 480, Web: 218 },
    { name: 'Haziran', WhatsApp: 239, SMS: 380, Web: 250 },
];

const noShowData = [
    { name: 'H1', rate: 12 },
    { name: 'H2', rate: 10 },
    { name: 'H3', rate: 8.5 },
    { name: 'H4', rate: 9 },
    { name: 'H5', rate: 7.2 },
    { name: 'H6', rate: 6.5 },
];

const breakdownData = [
    { country: 'Türkiye', lang: 'Türkçe', leads: 450, conv: 120, rate: 26.6 },
    { country: 'Almanya', lang: 'Almanca', leads: 210, conv: 45, rate: 21.4 },
    { country: 'İngiltere', lang: 'İngilizce', leads: 180, conv: 50, rate: 27.7 },
    { country: 'Fransa', lang: 'Fransızca', leads: 120, conv: 25, rate: 20.8 },
    { country: 'Hollanda', lang: 'Felemenkçe', leads: 90, conv: 20, rate: 22.2 },
    { country: 'Rusya', lang: 'Rusça', leads: 85, conv: 15, rate: 17.6 },
    { country: 'Suudi Arabistan', lang: 'Arapça', leads: 150, conv: 40, rate: 26.6 },
    { country: 'Türkiye', lang: 'İngilizce', leads: 110, conv: 30, rate: 27.2 },
    { country: 'ABD', lang: 'İngilizce', leads: 60, conv: 12, rate: 20.0 },
    { country: 'İtalya', lang: 'İtalyanca', leads: 45, conv: 8, rate: 17.7 },
];

function Analytics() {
    const [timeRange, setTimeRange] = useState('30days');

    return (
        <>
            <Helmet>
                <title>Analitik - MedFlow AI</title>
            </Helmet>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Analitik Raporlar</h1>
                        <p className="text-slate-600">Kampanya performansınızı ve dönüşüm oranlarını analiz edin.</p>
                    </div>
                    <div className="flex gap-2">
                        <Select value={timeRange} onValueChange={setTimeRange}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Zaman Aralığı" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7days">Son 7 Gün</SelectItem>
                                <SelectItem value="30days">Son 30 Gün</SelectItem>
                                <SelectItem value="90days">Son 3 Ay</SelectItem>
                                <SelectItem value="year">Bu Yıl</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            İndir
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mr-2">
                        <Filter className="w-4 h-4" /> Filtreler:
                    </div>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Kanal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tüm Kanallar</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="web">Web</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Kampanya" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tüm Kampanyalar</SelectItem>
                            <SelectItem value="summer">Yaz Fırsatları</SelectItem>
                            <SelectItem value="implant">İmplant İndirimi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Toplam Lead</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,248</div>
                            <p className="text-xs text-green-600 mt-1 flex items-center">
                                +12% <span className="text-slate-400 ml-1">geçen aya göre</span>
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Dönüşüm Oranı</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24.6%</div>
                            <p className="text-xs text-green-600 mt-1 flex items-center">
                                +2.4% <span className="text-slate-400 ml-1">geçen aya göre</span>
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">Ortalama Skor</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">72/100</div>
                            <p className="text-xs text-red-600 mt-1 flex items-center">
                                -1.2 <span className="text-slate-400 ml-1">geçen aya göre</span>
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">No-Show Oranı</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">6.5%</div>
                            <p className="text-xs text-green-600 mt-1 flex items-center">
                                -0.5% <span className="text-slate-400 ml-1">iyileşme</span>
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Funnel Dönüşümü</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <FunnelChart>
                                    <Tooltip />
                                    <Funnel
                                        dataKey="value"
                                        data={funnelData}
                                        isAnimationActive
                                    >
                                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                                    </Funnel>
                                </FunnelChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Kanal Performansı</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={channelData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="WhatsApp" fill="#22c55e" />
                                    <Bar dataKey="SMS" fill="#3b82f6" />
                                    <Bar dataKey="Web" fill="#f59e0b" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>No-Show Trendi</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={noShowData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Kampanya Karşılaştırması</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center text-slate-400">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { name: 'Yaz İndirimi', val: 65 },
                                    { name: 'Kış Bakımı', val: 45 },
                                    { name: 'Hoşgeldin', val: 80 },
                                    { name: 'Referans', val: 30 }
                                ]}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="val" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Breakdown Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Detaylı Kırılım</CardTitle>
                        <CardDescription>Ülke ve dil bazlı performans analizi</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ülke</TableHead>
                                    <TableHead>Dil</TableHead>
                                    <TableHead className="text-right">Lead Sayısı</TableHead>
                                    <TableHead className="text-right">Dönüşümler</TableHead>
                                    <TableHead className="text-right">Dönüşüm Oranı</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {breakdownData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{row.country}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{row.lang}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{row.leads}</TableCell>
                                        <TableCell className="text-right">{row.conv}</TableCell>
                                        <TableCell className="text-right font-bold text-blue-600">%{row.rate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default Analytics;