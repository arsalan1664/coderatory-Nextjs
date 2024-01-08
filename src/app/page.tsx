'use client'
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { Sidebar } from './components/Sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const router = useRouter()
  const { status } = useSession()
  console.log(useSession());
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }


  return (
    <div className="grid lg:grid-cols-6">
      <Sidebar />
      <div className="col-span-3 lg:col-span-5 lg:border-l">
        <div className="h-full px-2 py-6 lg:px-2">
          <h1 className='flex items-center justify-center h-[80vh] text-forground text-3xl' >App</h1>
        </div>
      </div>
    </div>
  )
}


