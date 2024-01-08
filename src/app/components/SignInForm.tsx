'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shell, MailsIcon, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Link from 'next/link';

const SignInForm = () => {

    const router = useRouter();

    const { status } = useSession();

    const [email, setEmail] = useState('');  

    const [isLoading, setIsloading] = useState(false);

    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        setIsloading(true);
        console.log(email,password);
        
        
        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if(!signInResponse || signInResponse.ok !== true) {
                toast("Invalid credentials")
            } else {
                router.refresh();
            }

        } catch(err) {
            console.log(err);
        }

        if (message) {
            toast(`${message}`)
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            router.refresh();
            router.push('/');
        }
    }, [status]);

    return (
        // <div className='flex flex-col gap-4 bg-gray-400 p-4'>
        //     <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        //     <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        //     <button onClick={handleSubmit}>Sign in</button>

        //     <p>{message}</p>
        // </div>
        <div className="container relative  h-[90vh] flex flex-col items-center justify-center pt-0">
        <div className="p-14">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                <Card className="bg-accent p-4">
                    <CardHeader>
                        <CardTitle>
                            {/* AUth containner */}
                            <div className="flex flex-col space-y-2 text-center">
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    Login your account
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Enter your email below to create your account
                                </p>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    {/* UserAuthForm start*/}
                    <CardContent>
                        <div className="grid gap-6">
                            {/* <form onSubmit={handleSubmit}> */}
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <Input
                                            id="email"
                                            placeholder="Email.."
                                            type="email"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <Input
                                            id="password"
                                            placeholder="Password.."
                                            type="password"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button onClick={handleSubmit} disabled={isLoading} className="mt-2 mb-4"  >
                                        {isLoading && (
                                            <Shell className="mr-2  h-4 w-4 animate-spin" />
                                        )}
                                        Log In
                                    </Button>

                                    <div className="relative ">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-background px-2 text-muted-foreground">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>


                                    <div className="space-y-2">
                                        <Button className="w-full bg-red-500 hover:bg-red-500/80" variant="outline" type="button" disabled={isLoading}>
                                            {isLoading ? (
                                                <Shell className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <MailsIcon className="mr-2 h-4 w-4" />
                                            )}{" "}
                                            Continue with Google
                                        </Button>

                                        <Button className="w-full bg-blue-500 hover:bg-blue-500/80" variant="outline" type="button" disabled={isLoading}>
                                            {isLoading ? (
                                                <Shell className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                <Linkedin className="mr-2 h-4 w-4 text-foreground" />
                                            )}{" "}
                                            Continue with Linkedin
                                        </Button>
                                    </div>

                                    <p className="px-8 text-center text-sm text-muted-foreground ">
                                        {" "}
                                        <Link
                                            href={"/auth/signup"}
                                            className="underline underline-offset-4 hover:text-primary"
                                        >
                                            Register,
                                        </Link>{" "}
                                        <Link
                                            href={"/auth/reset-password"}
                                            className="underline underline-offset-4 hover:text-primary"
                                        >
                                            Reset Password
                                        </Link>{" "}
                                        .
                                    </p>
                                  
                                </div>
                            {/* </form> */}
                        </div>
                    </CardContent>
                    {/* UserAuthForm ends */}
                </Card>
            </div>
        </div>
    </div>
    );
};

export default SignInForm;