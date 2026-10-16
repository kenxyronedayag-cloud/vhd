
import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in | Virtual HelpDesk" />

            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
                <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">
                    <div className="flex flex-col justify-center bg-blue-600 p-10 text-white md:p-12">
                        <div className="mb-10 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl font-bold text-blue-600">
                                H
                            </div>
                            <span className="text-xl font-bold">
                                Virtual HelpDesk
                            </span>
                        </div>

                        <p className="mb-3 font-semibold uppercase tracking-widest text-blue-100">
                            Support made simple
                        </p>

                        <h1 className="text-4xl font-bold leading-tight">
                            Welcome back!
                        </h1>

                        <p className="mt-5 leading-7 text-blue-100">
                            Log in to submit support requests, chat with our
                            help desk team, and track the progress of your
                            concerns.
                        </p>

                        <div className="mt-10 space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-bold">
                                    1
                                </span>
                                <span>Submit and manage requests</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-bold">
                                    2
                                </span>
                                <span>Communicate with support staff</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-bold">
                                    3
                                </span>
                                <span>Keep track of your concerns</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Log in to your account
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Enter your credentials to continue.
                        </p>

                        {status && (
                            <div className="mt-5 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="mt-8 flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-sm text-blue-600 hover:text-blue-700"
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                        />
                                        <Label htmlFor="remember" className="text-slate-700">
                                            Remember me
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner />}
                                        Log in
                                    </Button>
                                </>
                            )}
                        </Form>

                        <p className="mt-6 text-center text-sm text-slate-600">
                            Don't have an account?{' '}
                            <TextLink
                                href={register()}
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Create an account
                            </TextLink>
                        </p>

                        <div className="mt-8 text-center">
                            <TextLink
                                href="/"
                                className="text-sm text-slate-500 hover:text-blue-600"
                            >
                                Back to Home
                            </TextLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Login.layout = {
    title: 'Log in',
    description: 'Access your Virtual HelpDesk account',
};
