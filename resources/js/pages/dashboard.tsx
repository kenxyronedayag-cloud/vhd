
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { dashboard, logout } from '@/routes';

type SupportRequest = {
    id: string;
    subject: string;
    category: string;
    status: string;
    date: string;
};

type DashboardProps = {
    auth: {
        user: {
            name: string;
            email: string;
        };
    };
    requests: SupportRequest[];
    stats: {
        total: number;
        pending: number;
        inProgress: number;
        resolved: number;
    };
};

export default function Dashboard() {
    const [profileOpen, setProfileOpen] = useState(false);
    const { auth, requests, stats } = usePage<DashboardProps>().props;

    return (
        <>
            <Head title="Client Dashboard | Virtual HelpDesk" />

            <div className="min-h-screen bg-slate-50 text-slate-800">
                <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5 md:px-10">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Client Dashboard
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage your support requests in one place.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/support-requests/create"
                            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            + New Request
                        </Link>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>

                                <div className="hidden text-left sm:block">
                                    <p className="text-sm font-semibold text-slate-900">
                                        {auth.user.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Client Account
                                    </p>
                                </div>

                                <span className="text-slate-500">⌄</span>
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 z-10 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                                    <div className="border-b border-slate-100 px-3 py-2">
                                        <p className="font-semibold text-slate-900">
                                            {auth.user.name}
                                        </p>
                                        <p className="break-all text-xs text-slate-500">
                                            {auth.user.email}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => router.post(logout().url)}
                                        className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                    >
                                        Log out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl space-y-8 p-6 md:p-10">
                    <section>
                        <h2 className="text-lg font-bold text-slate-900">
                            Overview
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Here is a summary of your support activity.
                        </p>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                            <SummaryCard
                                title="Total Requests"
                                value={stats.total}
                                detail="All requests submitted"
                                icon="▤"
                            />
                            <SummaryCard
                                title="Pending"
                                value={stats.pending}
                                detail="Waiting for support"
                                icon="◷"
                            />
                            <SummaryCard
                                title="In Progress"
                                value={stats.inProgress}
                                detail="Currently being handled"
                                icon="↻"
                            />
                            <SummaryCard
                                title="Resolved"
                                value={stats.resolved}
                                detail="Successfully completed"
                                icon="✓"
                            />
                        </div>
                    </section>

                    <section
                        id="requests"
                        className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Recent Requests
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    View the latest updates on your requests.
                                </p>
                            </div>

                            <a
                                href="#requests"
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                View All
                            </a>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Request</th>
                                        <th className="px-6 py-4 font-medium">Category</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Date Submitted</th>
                                        <th className="px-6 py-4 font-medium">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {requests.length > 0 ? (
                                        requests.map((request) => (
                                            <tr key={request.id}>
                                                <td className="px-6 py-4">
                                                    <p className="font-semibold text-slate-900">
                                                        {request.subject}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {request.id}
                                                    </p>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                                                    {request.category}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <StatusBadge status={request.status} />
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                                                    {request.date}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <Link
                                                        href={`/support-requests/${Number(request.id.replace('VH-', ''))}/chat`}
                                                        className="font-semibold text-blue-600 hover:text-blue-700"
                                                    >
                                                        Open
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-12 text-center text-slate-500"
                                            >
                                                You have not submitted any support requests yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
                            Showing your submitted support requests.
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

function SummaryCard({
    title,
    value,
    detail,
    icon,
}: {
    title: string;
    value: number;
    detail: string;
    icon: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-600">
                    {icon}
                </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
            <p className="mt-2 text-xs text-slate-500">{detail}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        Pending: 'bg-amber-50 text-amber-700',
        'In Progress': 'bg-blue-50 text-blue-700',
        Resolved: 'bg-green-50 text-green-700',
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status] ?? 'bg-slate-100 text-slate-600'}`}
        >
            {status}
        </span>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
