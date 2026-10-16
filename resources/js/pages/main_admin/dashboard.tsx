
import { Head } from '@inertiajs/react';

export default function MainAdminDashboard() {
    return (
        <>
            <Head title="Main Admin Dashboard | Virtual HelpDesk" />
            <main className="min-h-screen bg-slate-50 p-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Main Admin Dashboard
                </h1>
                <p className="mt-2 text-slate-600">
                    Manage agents and oversee the help desk.
                </p>
            </main>
        </>
    );
}
