import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Search, Send, Phone, MoreVertical, Paperclip,
    MessageSquare, User, Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock Conversations
const conversations = [
    { id: 1, name: 'Ayşe Demir', lastMsg: 'Randevu saatimi değiştirebilir miyim?', time: '10:30', unread: 2, channel: 'WhatsApp', stage: 'Randevu' },
    { id: 2, name: 'Mehmet Yılmaz', lastMsg: 'Teşekkürler, görüşmek üzere.', time: '09:15', unread: 0, channel: 'SMS', stage: 'Lead' },
    { id: 3, name: 'Zeynep Kaya', lastMsg: 'Fiyat listenizi alabilir miyim?', time: 'Dün', unread: 1, channel: 'WhatsApp', stage: 'Qualified' },
    { id: 4, name: 'Ali Özdemir', lastMsg: 'Konumunuzu gönderir misiniz?', time: 'Dün', unread: 0, channel: 'SMS', stage: 'Tedavi' },
    { id: 5, name: 'Fatma Şahin', lastMsg: 'Randevumu onaylıyorum.', time: 'Pzt', unread: 0, channel: 'WhatsApp', stage: 'Randevu' },
];

const messages = [
    { id: 1, text: 'Merhaba Ayşe Hanım, MedFlow Kliniğine hoş geldiniz. Size nasıl yardımcı olabilirim?', sender: 'ai', time: '10:00' },
    { id: 2, text: 'Merhabalar, yarınki randevum için bir değişiklik yapmak istiyorum.', sender: 'user', time: '10:05' },
    { id: 3, text: 'Tabii, yarın saat 14:00\'teki randevunuzu hangi güne ertelemek istersiniz?', sender: 'agent', time: '10:10' },
    { id: 4, text: 'Cuma günü saat 15:00 uygun mu?', sender: 'user', time: '10:15' },
    { id: 5, text: 'Kontrol ediyorum... Evet, Cuma 15:00 uygun. Randevunuzu güncelliyorum.', sender: 'ai', time: '10:16' },
    { id: 6, text: 'Randevu saatimi değiştirebilir miyim? Aslında 16:00 daha iyi olur.', sender: 'user', time: '10:30' },
];

function MessagingInbox() {
    const [activeChat, setActiveChat] = useState(conversations[0]);
    const [messageInput, setMessageInput] = useState('');
    const { toast } = useToast();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        toast({
            title: "Mesaj Gönderildi",
            description: "Mesajınız başarıyla iletildi."
        });
        setMessageInput('');
    };

    const handleAction = (action) => {
        toast({
            title: "İşlem Başlatıldı",
            description: `${action} penceresi açılıyor...`
        });
    };

    return (
        <>
            <Helmet>
                <title>Mesajlar - MedFlow AI</title>
            </Helmet>

            <div className="h-[calc(100vh-6rem)] flex bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                {/* Left Panel: Conversation List */}
                <div className="w-1/4 min-w-[300px] border-r border-slate-200 flex flex-col bg-slate-50">
                    <div className="p-4 border-b border-slate-200 bg-white">
                        <h2 className="text-lg font-bold text-slate-900 mb-3">Mesajlar</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input placeholder="Mesajlarda ara..." className="pl-9 bg-slate-50" />
                        </div>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="divide-y divide-slate-100">
                            {conversations.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`p-4 cursor-pointer hover:bg-white transition-colors ${activeChat.id === chat.id ? 'bg-white border-l-4 border-blue-500' : ''}`}
                                    onClick={() => setActiveChat(chat)}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}`} />
                                                <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className={`text-sm font-semibold ${activeChat.id === chat.id ? 'text-blue-700' : 'text-slate-900'}`}>
                                                    {chat.name}
                                                </h3>
                                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                                    {chat.channel === 'WhatsApp' ? <MessageSquare className="w-3 h-3 text-green-600" /> : <MessageSquare className="w-3 h-3 text-blue-600" />}
                                                    {chat.channel}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-400 whitespace-nowrap">{chat.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center pl-[52px]">
                                        <p className="text-sm text-slate-600 truncate max-w-[160px]">{chat.lastMsg}</p>
                                        {chat.unread > 0 && (
                                            <span className="w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Center Panel: Chat Window */}
                <div className="flex-1 flex flex-col bg-white">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeChat.name}`} />
                                <AvatarFallback>{activeChat.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-bold text-slate-900">{activeChat.name}</h3>
                                <div className="flex items-center gap-2 text-xs">
                                    <Badge variant="outline" className="text-slate-600 font-normal">
                                        {activeChat.stage}
                                    </Badge>
                                    <span className="text-slate-400">•</span>
                                    <span className="text-slate-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Son görülme 10 dk önce
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleAction("Randevu Oluştur")}>
                                Randevu Oluştur
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleAction("Not Ekle")}>
                                Not Ekle
                            </Button>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-5 h-5 text-slate-500" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-4 bg-slate-50/50">
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : msg.sender === 'ai'
                                                    ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                                                    : 'bg-slate-200 text-slate-800 rounded-tl-none'
                                            }`}
                                    >
                                        <p className="text-sm">{msg.text}</p>
                                        <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                                            {msg.time} • {msg.sender === 'ai' ? 'AI Asistan' : msg.sender === 'agent' ? 'Temsilci' : ''}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 border-t border-slate-200 bg-white">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                            <Button type="button" variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                                <Paperclip className="w-5 h-5" />
                            </Button>
                            <Input
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Bir mesaj yazın..."
                                className="flex-1"
                            />
                            <Button type="submit" disabled={!messageInput.trim()}>
                                <Send className="w-4 h-4 mr-2" />
                                Gönder
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Right Panel: Context */}
                <div className="w-1/4 min-w-[280px] border-l border-slate-200 bg-slate-50 p-4 overflow-y-auto hidden xl:block">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-3">Lead Özeti</h3>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 space-y-3">
                                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        {activeChat.name.substring(0, 2)}
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-900">{activeChat.name}</div>
                                        <div className="text-xs text-slate-500">+90 555 123 45 67</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Dil</span>
                                        <span className="font-medium text-slate-900">Türkçe</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Lead Skoru</span>
                                        <span className="font-medium text-green-600">85/100</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Aşama</span>
                                        <Badge variant="secondary" className="font-normal text-xs">{activeChat.stage}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-3">Klinik Bağlamı</h3>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 space-y-3">
                                <div className="text-sm">
                                    <span className="block text-slate-500 text-xs mb-1">Klinik</span>
                                    <span className="font-medium text-slate-900">Dental Clinic İstanbul</span>
                                </div>
                                <div className="text-sm">
                                    <span className="block text-slate-500 text-xs mb-1">İlgilendiği Hizmet</span>
                                    <span className="font-medium text-slate-900">İmplant Tedavisi</span>
                                </div>
                                <div className="text-sm">
                                    <span className="block text-slate-500 text-xs mb-1">Son Not</span>
                                    <p className="text-slate-600 text-xs italic bg-yellow-50 p-2 rounded border border-yellow-100 mt-1">
                                        "Hasta fiyat bilgisi istedi, randevu için haftaya müsait."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Spam Olarak İşaretle
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-green-600 hover:text-green-700 hover:bg-green-50">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Tedavi Tamamlandı
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MessagingInbox;