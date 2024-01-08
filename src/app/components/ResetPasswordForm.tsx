"use client";
import React, { useEffect, useState } from 'react'
import { resetPassword } from '../actions/users/resetPassword';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shell, Link } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ResetPasswordForm = () => {
    const { status } = useSession()
    const router = useRouter()
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        const message = await resetPassword(email);

        setMessage(message);
        toast(`${message}`)
    }
    
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
                                    Reset Password
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Enter your email below to reset your password
                                </p>
                            </div>
                        </CardHeader>
                        {/* UserAuthForm start*/}
                        <CardContent>
                            <div className="grid gap-6">

                                <div className="grid gap-2">

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


                                    <Button onClick={handleSubmit} disabled={isLoading} className="mt-2">
                                        {isLoading && <Shell className="mr-2 h-4 w-4 animate-spin" />}
                                        Reset password
                                    </Button>

                                </div>

                            </div>

                            {/* UserAuthForm ends */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordForm