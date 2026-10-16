
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

type SupportMessage = {
    id: number;
    message: string;
    sender_id: number;
    sender_name: string;
    sender_role: string;
    created_at: string;
};

type ChatProps = {
    supportRequest: {
        id: number;
        reference: string;
        subject: string;
        category: string;
        status: string;
    };
    messages: SupportMessage[];
    currentUserId: number;
};

export default function SupportRequestChat() {
    const { supportRequest, messages, currentUserId } =
        usePage<ChatProps>().props;

    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (!data.message.trim()) return;

        post(`/support-requests/${supportRequest.id}/messages`, {
            onSuccess: () => reset('message'),
        });
    }

    return (
        <>
            <Head title={`Chat | ${supportRequest.reference}`} />

            <div className="min-h-screen bg-slate-50 text-slate-800">
                <header className="border-b border-slate-200 bg-white px-6 py-5 md:px-10">
                    <div className="mx-auto max-w-5xl">
                        <Link
                            href="/client/dashboard"
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                            ← Back to Dashboard
                        </Link>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    {supportRequest.subject}
                                </h1>
                                <p className="mt-1 text-sm text-slate-500">
                                    {supportRequest.reference} · {supportRequest.category}
                                </p>
                            </div>

                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                {supportRequest.status}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-5xl p-4 md:p-8">
                    <section className="flex h-[70vh] min-h-[420px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 px-5 py-4">
                            <h2 className="font-bold text-slate-900">
                                Conversation
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Messages about your support request.
                            </p>
                        </div>

                        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 md:p-6">
                            {messages.length === 0 ? (
                                <div className="flex h-full items-center justify-center text-center">
                                    <div>
                                        <p className="font-semibold text-slate-700">
                                            No messages yet
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Send a message to start the conversation.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                messages.map((message) => {
                                    const isMine =
                                        message.sender_id === currentUserId;

                                    return (
                                        <div
                                            key={message.id}
                                            className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] md:max-w-[70%] ${
                                                    isMine ? 'items-end' : 'items-start'
                                                } flex flex-col`}
                                            >
                                                {!isMine && (
                                                    <p className="mb-1 ml-1 text-xs font-semibold text-slate-500">
                                                        {message.sender_name}
                                                    </p>
                                                )}

                                                <div
                                                    className={`rounded-2xl px-4 py-3 ${
                                                        isMine
                                                            ? 'rounded-br-md bg-blue-600 text-white'
                                                            : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'
                                                    }`}
                                                >
                                                    <p className="whitespace-pre-wrap break-words text-sm">
                                                        {message.message}
                                                    </p>
                                                </div>

                                                <p className="mt-1 px-1 text-xs text-slate-400">
                                                    {message.created_at}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <form
                            onSubmit={submit}
                            className="border-t border-slate-200 bg-white p-4"
                        >
                            <div className="flex items-end gap-3">
                                <textarea
                                    value={data.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === 'Enter' &&
                                            !e.shiftKey
                                        ) {
                                            e.preventDefault();
                                            e.currentTarget.form?.requestSubmit();
                                        }
                                    }}
                                    placeholder="Type your message..."
                                    rows={2}
                                    maxLength={5000}
                                    className="min-h-12 flex-1 resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <button
                                    type="submit"
                                    disabled={processing || !data.message.trim()}
                                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Sending...' : 'Send'}
                                </button>
                            </div>

                            {errors.message && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.message}
                                </p>
                            )}

                            <p className="mt-2 text-xs text-slate-400">
                                Press Enter to send. Use Shift + Enter for a new line.
                            </p>
                        </form>
                    </section>
                </main>
            </div>
        </>
    );
}
