import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    Calendar,
    Zap,
    BarChart3,
    Settings,
    Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
    { path: '/genel-bakis', label: 'Genel Bakış', icon: LayoutDashboard },
    { path: '/leadler', label: "Lead'ler", icon: Users },
    { path: '/mesajlar', label: 'Mesajlar', icon: MessageSquare },
    { path: '/randevular', label: 'Randevular', icon: Calendar },
    { path: '/otomasyonlar', label: 'Otomasyonlar', icon: Zap },
    { path: '/analitik', label: 'Analitik', icon: BarChart3 },
    { path: '/ayarlar', label: 'Ayarlar', icon: Settings },
];

function Sidebar({ isOpen }) {
    return (
        <aside
            className={cn(
                "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col",
                isOpen ? "w-64" : "w-20"
            )}
        >
            <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    {isOpen && (
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">MedFlow AI</h1>
                        </div>
                    )}
                </div>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                            "hover:bg-blue-50 hover:text-blue-600",
                                            isActive
                                                ? "bg-blue-50 text-blue-600 font-medium"
                                                : "text-slate-600"
                                        )
                                    }
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    {isOpen && <span className="text-sm">{item.label}</span>}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;