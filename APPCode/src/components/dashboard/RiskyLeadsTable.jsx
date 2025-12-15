import React from 'react';
import { AlertTriangle, Phone, MessageSquare, Mail, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const riskyLeads = [
    {
        id: 1,
        name: 'Ayşe Demir',
        riskScore: 85,
        lastContact: '3 gün önce',
        channel: 'WhatsApp',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ayse'
    },
    {
        id: 2,
        name: 'Mehmet Yılmaz',
        riskScore: 72,
        lastContact: '5 gün önce',
        channel: 'SMS',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mehmet'
    },
    {
        id: 3,
        name: 'Zeynep Kaya',
        riskScore: 68,
        lastContact: '1 hafta önce',
        channel: 'Web',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zeynep'
    },
    {
        id: 4,
        name: 'Ali Özdemir',
        riskScore: 65,
        lastContact: '4 gün önce',
        channel: 'WhatsApp',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ali'
    },
    {
        id: 5,
        name: 'Fatma Şahin',
        riskScore: 58,
        lastContact: '6 gün önce',
        channel: 'SMS',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatma'
    }
];

const channelIcons = {
    WhatsApp: MessageSquare,
    SMS: Phone,
    Web: Mail
};

function RiskyLeadsTable() {
    const { toast } = useToast();

    const handleAction = (action, leadName) => {
        toast({
            title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
            description: `Action: ${action} for ${leadName}`
        });
    };

    const getRiskColor = (score) => {
        if (score >= 75) return 'text-red-600 bg-red-100';
        if (score >= 60) return 'text-orange-600 bg-orange-100';
        return 'text-yellow-600 bg-yellow-100';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h2 className="text-lg font-semibold text-slate-900">Riskli Lead'ler</h2>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction('View All', 'leads')}
                >
                    Tümünü Gör
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">İsim</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Risk Skoru</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Son Temas</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Kanal</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riskyLeads.map((lead, index) => {
                            const ChannelIcon = channelIcons[lead.channel];
                            return (
                                <motion.tr
                                    key={lead.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={lead.avatar}
                                                alt={lead.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <span className="font-medium text-slate-900">{lead.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(lead.riskScore)}`}>
                                            <AlertTriangle className="w-3 h-3" />
                                            {lead.riskScore}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-slate-600">{lead.lastContact}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <ChannelIcon className="w-4 h-4" />
                                            <span className="text-sm">{lead.channel}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleAction('View', lead.name)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleAction('Call', lead.name)}
                                            >
                                                <Phone className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleAction('Message', lead.name)}
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RiskyLeadsTable;