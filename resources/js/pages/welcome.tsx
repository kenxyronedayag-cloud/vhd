import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Virtual HelpDesk" />

            <div className="min-h-screen bg-slate-50 text-slate-800">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                                H
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                                Virtual HelpDesk
                            </span>
                        </div>

                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-lg px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-100"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 py-20 md:flex-row md:py-28">
                    <section className="flex-1">
                        <p className="mb-4 font-semibold uppercase tracking-widest text-blue-600">
                            Support made simple
                        </p>

                        <h1 className="max-w-xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
                            How can we help you today?
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                            Submit support requests, communicate with our
                            help desk team, and keep track of your concerns
                            in one convenient place.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            {!auth.user && (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm hover:bg-blue-700"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-lg border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                                    >
                                        Create an Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </section>

                    <section className="w-full max-w-md">
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                                💬
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900">
                                Help when you need it
                            </h2>

                            <p className="mt-3 leading-7 text-slate-600">
                                Our help desk makes it easier to report
                                problems, get assistance, and follow the
                                progress of your requests.
                            </p>

                            <div className="mt-8 space-y-5">
                                <div className="flex items-start gap-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                                        1
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            Submit a request
                                        </h3>
                                        <p className="text-sm text-slate-600">
                                            Tell us what you need help with.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                                        2
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            Chat with support
                                        </h3>
                                        <p className="text-sm text-slate-600">
                                            Communicate with the assigned
                                            support staff.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                                        3
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            Track your request
                                        </h3>
                                        <p className="text-sm text-slate-600">
                                            Check the status of your concern.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} Virtual HelpDesk. All rights reserved.
                </footer>
            </div>
        </>
    );
}