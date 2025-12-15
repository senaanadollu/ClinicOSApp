import React from 'react';
import { Helmet } from 'react-helmet';
import KPICards from '@/components/dashboard/KPICards';
import FunnelChart from '@/components/dashboard/FunnelChart';
import LeadTrendsChart from '@/components/dashboard/LeadTrendsChart';
import RiskyLeadsTable from '@/components/dashboard/RiskyLeadsTable';

function OverviewDashboard() {
    return (
        <>
            <Helmet>
                <title>Genel Bakış - MedFlow AI</title>
                <meta name="description" content="Overview dashboard showing key metrics, lead trends, conversion funnel, and risky leads for your medical clinic." />
            </Helmet>

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Genel Bakış</h1>
                    <p className="text-slate-600 mt-1">Son performans ve metriklere göz atın</p>
                </div>

                <KPICards />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FunnelChart />
                    <LeadTrendsChart />
                </div>

                <RiskyLeadsTable />
            </div>
        </>
    );
}

export default OverviewDashboard;