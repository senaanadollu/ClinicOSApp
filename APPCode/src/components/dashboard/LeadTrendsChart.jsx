import React from 'react';
import { TrendingUp } from 'lucide-react';

const chartData = [
    { day: 1, leads: 8 },
    { day: 2, leads: 12 },
    { day: 3, leads: 10 },
    { day: 4, leads: 15 },
    { day: 5, leads: 18 },
    { day: 6, leads: 14 },
    { day: 7, leads: 20 },
    { day: 8, leads: 16 },
    { day: 9, leads: 22 },
    { day: 10, leads: 19 },
    { day: 11, leads: 25 },
    { day: 12, leads: 23 },
    { day: 13, leads: 18 },
    { day: 14, leads: 21 },
    { day: 15, leads: 28 },
    { day: 16, leads: 24 },
    { day: 17, leads: 26 },
    { day: 18, leads: 30 },
    { day: 19, leads: 27 },
    { day: 20, leads: 32 },
    { day: 21, leads: 29 },
    { day: 22, leads: 35 },
    { day: 23, leads: 31 },
    { day: 24, leads: 28 },
    { day: 25, leads: 33 },
    { day: 26, leads: 36 },
    { day: 27, leads: 34 },
    { day: 28, leads: 38 },
    { day: 29, leads: 35 },
    { day: 30, leads: 40 }
];

function LeadTrendsChart() {
    const maxLeads = Math.max(...chartData.map(d => d.leads));
    const totalLeads = chartData.reduce((sum, d) => sum + d.leads, 0);
    const avgLeads = Math.round(totalLeads / chartData.length);

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Lead Trendleri</h2>
                    <p className="text-sm text-slate-600 mt-1">Son 30 gün</p>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-medium">+24%</span>
                </div>
            </div>

            <div className="relative h-48 mb-6">
                <svg className="w-full h-full" viewBox="0 0 600 180">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <line
                            key={i}
                            x1="0"
                            y1={i * 45}
                            x2="600"
                            y2={i * 45}
                            stroke="#e2e8f0"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Area under the line */}
                    <path
                        d={`M 0,${180 - (chartData[0].leads / maxLeads) * 160} ${chartData
                            .map(
                                (d, i) =>
                                    `L ${(i / (chartData.length - 1)) * 600},${180 - (d.leads / maxLeads) * 160
                                    }`
                            )
                            .join(' ')} L 600,180 L 0,180 Z`}
                        fill="url(#areaGradient)"
                    />

                    {/* Line */}
                    <path
                        d={`M 0,${180 - (chartData[0].leads / maxLeads) * 160} ${chartData
                            .map(
                                (d, i) =>
                                    `L ${(i / (chartData.length - 1)) * 600},${180 - (d.leads / maxLeads) * 160
                                    }`
                            )
                            .join(' ')}`}
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {chartData.map((d, i) => (
                        <circle
                            key={i}
                            cx={(i / (chartData.length - 1)) * 600}
                            cy={180 - (d.leads / maxLeads) * 160}
                            r="4"
                            fill="#3b82f6"
                            className="hover:r-6 transition-all cursor-pointer"
                        />
                    ))}
                </svg>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div>
                    <p className="text-sm text-slate-600">Toplam</p>
                    <p className="text-xl font-bold text-slate-900">{totalLeads}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-600">Ortalama</p>
                    <p className="text-xl font-bold text-slate-900">{avgLeads}</p>
                </div>
                <div>
                    <p className="text-sm text-slate-600">En Yüksek</p>
                    <p className="text-xl font-bold text-slate-900">{maxLeads}</p>
                </div>
            </div>
        </div>
    );
}

export default LeadTrendsChart;