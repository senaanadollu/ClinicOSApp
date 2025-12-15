import React from 'react';
import { Helmet } from 'react-helmet';
import { Construction } from 'lucide-react';

function PlaceholderPage({ title }) {
    return (
        <>
            <Helmet>
                <title>{title} - MedFlow AI</title>
                <meta name="description" content={`${title} page for MedFlow AI healthcare dashboard`} />
            </Helmet>

            <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-white rounded-lg shadow-sm p-12 text-center max-w-md">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Construction className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
                    <p className="text-slate-600">
                        Bu sayfa henüz geliştirilme aşamasında. Yakında burada olacak!
                    </p>
                </div>
            </div>
        </>
    );
}

export default PlaceholderPage;