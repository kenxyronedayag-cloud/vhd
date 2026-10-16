import { Head } from '@inertiajs/react';

export default function AgentDashboard() {
    return (
        <>
            <Head title="Agent Dashboard | Virtual HelpDesk" />
            <main className="min-h-screen bg-slate-50 p-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Agent Dashboard
                </h1>
                <p className="mt-2 text-slate-600">
                    Manage support requests and assist clients.
                </p>
            </main>
        </>
    );
}
