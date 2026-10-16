import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Register | Virtual HelpDesk" />

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
                            Get started today!
                        </h1>

                        <p className="mt-5 leading-7 text-blue-100">
                            Create your account to submit support requests,
                            communicate with our help desk team, and keep
                            track of your concerns.
                        </p>

                        <div className="mt-10 space-y-5">
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-bold">
                                    1
                                </span>
                                <span>Report your concerns</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-bold">
                                    2
                                </span>
                                <span>Connect with support staff</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 font-bold">
                                    3
                                </span>
                                <span>Track your requests</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Create an account
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Fill in your details to get started.
                        </p>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="mt-8 flex flex-col gap-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Full name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            autoComplete="name"
                                            name="name"
                                            placeholder="Enter your full name"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            name="email"
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            required
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="Create a password"
                                            passwordrules={passwordRules}
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">
                                            Confirm password
                                        </Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            required
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="Re-enter your password"
                                            passwordrules={passwordRules}
                                        />
                                        <InputError
                                            message={errors.password_confirmation}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
                                        disabled={processing}
                                        data-test="register-user-button"
                                    >
                                        {processing && <Spinner />}
                                        Create Account
                                    </Button>
                                </>
                            )}
                        </Form>

                        <p className="mt-6 text-center text-sm text-slate-600">
                            Already have an account?{' '}
                            <TextLink
                                href={login()}
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Log in
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

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};