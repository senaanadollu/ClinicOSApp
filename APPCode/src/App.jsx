import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OverviewDashboard from '@/pages/OverviewDashboard';
import LeadManagement from '@/pages/LeadManagement';
import MessagingInbox from '@/pages/MessagingInbox';
import Appointments from '@/pages/Appointments';
import Automations from '@/pages/Automations';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import PlaceholderPage from '@/pages/PlaceholderPage';

function App() {
    return (
        <>
            <Helmet>
                <title>MedFlow AI - Healthcare SaaS Dashboard</title>
                <meta name="description" content="MedFlow AI is a comprehensive healthcare SaaS platform for managing leads, appointments, automations, and analytics for medical clinics." />
            </Helmet>
            <Router>
                <Routes>
                    <Route path="/" element={<DashboardLayout />}>
                        <Route index element={<Navigate to="/genel-bakis" replace />} />
                        <Route path="genel-bakis" element={<OverviewDashboard />} />
                        <Route path="leadler" element={<LeadManagement />} />
                        <Route path="mesajlar" element={<MessagingInbox />} />
                        <Route path="randevular" element={<Appointments />} />
                        <Route path="otomasyonlar" element={<Automations />} />
                        <Route path="analitik" element={<Analytics />} />
                        <Route path="ayarlar" element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
            <Toaster />
        </>
    );
}

export default App;