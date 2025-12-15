import React from 'react';
import { Bell, ChevronDown, Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

function TopBar({ onMenuClick }) {
    const { toast } = useToast();

    const handleNotImplemented = () => {
        toast({
            title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
        });
    };

    return (
        <header className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="text-slate-600 hover:text-slate-900"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <span className="text-sm font-medium">Dental Clinic İstanbul</span>
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64">
                            <DropdownMenuItem onClick={handleNotImplemented}>
                                Dental Clinic İstanbul
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleNotImplemented}>
                                Hair Transplant Clinic Ankara
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleNotImplemented}>
                                Aesthetic Surgery Center İzmir
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900">
                                <Globe className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleNotImplemented}>Türkçe</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleNotImplemented}>English</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleNotImplemented}>Deutsch</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-600 hover:text-slate-900 relative"
                        onClick={handleNotImplemented}
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2 p-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                                    <AvatarFallback>DR</AvatarFallback>
                                </Avatar>
                                <div className="text-left hidden md:block">
                                    <div className="text-sm font-medium text-slate-900">Dr. Ahmet Yılmaz</div>
                                    <div className="text-xs text-slate-500">Admin</div>
                                </div>
                                <ChevronDown className="w-4 h-4 text-slate-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={handleNotImplemented}>Profil</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleNotImplemented}>Ayarlar</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleNotImplemented}>Çıkış Yap</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

export default TopBar;