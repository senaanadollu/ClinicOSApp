import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Users, AlertTriangle, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const kpiData = [
    {
        title: "Yeni Lead'ler",
        value: '24',
        change: '+12%',
        isPositive: true,
        icon: Users,
        color: 'blue'
    },
    {
        title: 'Randevu Sayısı',
        value: '18',
        change: '+8%',
        isPositive: true,
        icon: Calendar,
        color: 'green'
    },
    {
        title: 'No-Show Oranı',
        value: '8.5%',
        change: '-2%',
        isPositive: true,
        icon: AlertTriangle,
        color: 'red'
    },
    {
        title: 'Dönüşüm Oranı',
        value: '42%',
        change: '+5%',
        isPositive: true,
        icon: Target,
        color: 'purple'
    }
];

const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600'
};

function KPICards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                    <motion.div
                        key={kpi.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colorClasses[kpi.color])}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1">
                                {kpi.isPositive ? (
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                ) : (
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                )}
                                <span className={cn(
                                    "text-sm font-medium",
                                    kpi.isPositive ? "text-green-600" : "text-red-600"
                                )}>
                                    {kpi.change}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-slate-600 text-sm mb-1">{kpi.title}</h3>
                        <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default KPICards;