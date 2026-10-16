import { Head, Link, useForm } from '@inertiajs/react';

export default function CreateSupportRequest() {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        category: '',
        description: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/support-requests');
    }

    return (
        <>
            <Head title="New Support Request | Virtual HelpDesk" />

            <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-800">
                <div className="mx-auto max-w-2xl">
                    <Link
                        href="/client/dashboard"
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                        ← Back to Dashboard
                    </Link>

                    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <h1 className="text-2xl font-bold text-slate-900">
                            Create Support Request
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Describe your issue and our support team will assist you.
                        </p>

                        <form onSubmit={submit} className="mt-8 space-y-6">
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    placeholder="Briefly describe your issue"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    required
                                />
                                {errors.subject && (
                                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="category"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Category
                                </label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="Technical Support">Technical Support</option>
                                    <option value="Account Assistance">Account Assistance</option>
                                    <option value="Software">Software</option>
                                    <option value="Network">Network</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Explain the issue in more detail..."
                                    rows={5}
                                    className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    required
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <Link
                                    href="/client/dashboard"
                                    className="rounded-lg border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}