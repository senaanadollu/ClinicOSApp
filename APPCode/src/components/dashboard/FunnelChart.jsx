import React from 'react';
import { motion } from 'framer-motion';

const funnelData = [
    { stage: 'Lead', count: 450, color: 'bg-blue-500', percentage: 100 },
    { stage: 'Qualified', count: 320, color: 'bg-blue-600', percentage: 71 },
    { stage: 'Randevu', count: 180, color: 'bg-green-500', percentage: 40 },
    { stage: 'Tedavi', count: 120, color: 'bg-green-600', percentage: 27 },
    { stage: 'Upsell', count: 45, color: 'bg-purple-500', percentage: 10 }
];

function FunnelChart() {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Dönüşüm Hunisi</h2>

            <div className="space-y-4">
                {funnelData.map((item, index) => (
                    <motion.div
                        key={item.stage}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">{item.stage}</span>
                            <span className="text-sm text-slate-600">{item.count} ({item.percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-10 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percentage}%` }}
                                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                                className={`h-full ${item.color} flex items-center justify-center text-white text-sm font-medium rounded-full`}
                            >
                                {item.percentage > 15 && `${item.percentage}%`}
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-slate-900">27%</p>
                        <p className="text-sm text-slate-600">Toplam Dönüşüm</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">$125K</p>
                        <p className="text-sm text-slate-600">Toplam Gelir</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FunnelChart;