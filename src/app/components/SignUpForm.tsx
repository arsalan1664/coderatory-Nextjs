'use client';

import React, { useEffect, useState } from 'react';
import { signUp } from '../actions/users/signUp';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


const SignUpForm = () => {

    const router = useRouter()
    const { status } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {

        setIsLoading(true);
        console.log(email, password);
        const message = await signUp(email, password);

        if (message === 'Successfully created new user!') {
            toast('Successfully created new user!')
            setIsLoading(false);
        }
        if (message === 'User with that email already exists.') {
            toast('User with that email already exists.')
            setIsLoading(false);
        }

  
    };

    useEffect(() => {
        if (status === 'authenticated') {
          router.push('/');
        }
      }, [status]);

    return (

        <div className="container relative  h-[80vh] flex flex-col items-center justify-center pt-0">
            <div className="p-14">
                {/* UserLogin */}
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    <Card className="bg-accent p-4">
                        <CardHeader>
                            {/* AUth containner */}
                            <div className="flex flex-col space-y-2 text-center">
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    Create an account
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Enter your email below to create your account
                                </p>
                            </div>
                        </CardHeader>
                        {/* UserAuthForm start*/}
                        <CardContent>
                            <div className="grid gap-6">

                                <div className="grid gap-2">
                                    {/* <div className="grid gap-1">
                                <Label className="" htmlFor="Username">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    placeholder="Username"
                                    type="text"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div> */}
                                    <div className="grid gap-1">
                                        <Label className="" htmlFor="email">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <Label className="" htmlFor="passward">
                                            Passward
                                        </Label>
                                        <Input
                                            id="passward"
                                            placeholder="Passward"
                                            type="password"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <Button onClick={handleSubmit} disabled={isLoading} className="mt-2">
                                        {isLoading && <Shell className="mr-2 h-4 w-4 animate-spin" />}
                                        Register
                                    </Button>

                                </div>

                            </div>

                            {/* UserAuthForm ends */}

                            <p className="px-8 text-center text-sm text-muted-foreground mt-2">
                                Already have an account,{" "}
                                <Link href={"/auth/signin"}

                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Login
                                </Link>{" "}
                                .
                            </p>
                            

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;








