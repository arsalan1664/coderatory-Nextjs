import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { Grip, Settings } from 'lucide-react';
import { ThemeToggle } from './Theme/Theme';
import { UserAvatar } from './Avatar/UserAvatar';

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        // <div className='w-full px-4 py-8 bg-gray-300 flex flex-row items-center gap-4'>
        //     <Link href='/'>Home</Link>
        //     <Link href='/protected/dashboard'>Dashboard</Link>

        //     {session && session.user?.email ? (
        //         <>
        //             <Link href='/auth/signout'>Sign out</Link>
        //             <p>
        //                 <b>Signed in as {session.user?.email}</b>
        //             </p>
        //         </>
        //     ) : (
        //         <>
        //             <Link href='/auth/signin'>Sign in</Link>
        //             <Link href='/auth/signup'>Sign up</Link>
        //         </>
        //     )}
        // </div>
        <div className=" h-16   w-full  border-b bg-slate-100 dark:bg-slate-950">
            <div className="mx-16 my-1 flex items-center h-full w-['75%']">
                <div className="flex items-center justify-between w-full h-full">
                    <div className="flex items-center justify-start w-full h-full">
                        {/* <img className="w-auto h-14" src="/RFID-72-Res-Logo-190x83.png"/> */}
                        <Link href={"/"} className=" scroll-m-20 text-2xl font-semibold tracking-tight" >App</Link>
                    </div>
                    {session && session.user?.email ? (
                        <>
                            <div className="flex gap-3">
                                {/* <Link href={''} className={` ${buttonVariants({ variant: "link" })}`}> <h1>Dashboard</h1></Link> */}
                                <Link href={''} className={` ${buttonVariants({ variant: "secondary", size: 'icon' })}`}> <Grip size={20} />{" "}</Link>
                                <Link href={''} className={` ${buttonVariants({ variant: "secondary", size: 'icon' })}`}> <Settings size={20} />{" "}</Link>
                                <ThemeToggle />
                                <UserAvatar />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-3">
                                <Link href='/auth/signin'className={` ${buttonVariants({ variant: "outline", size: 'sm' })}`}>Sign in</Link>
                                <Link href='/auth/signup'className={` ${buttonVariants({ variant: "outline", size: 'sm' })}`}>Sign up</Link>
                                <ThemeToggle />

                            </div>

                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;