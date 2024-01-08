'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TestEmailButton from './components/TestEmailButton';

export default function Home() {
  const router = useRouter()
  const {status} = useSession()
  console.log(useSession());
  
  useEffect(() => {
    if (status ==='unauthenticated') {
        router.refresh();
        router.push('/auth/signin');
    }
}, [status]);
  return (
    <div className='w-full'>
      <h1 className='text-3xl'>Home Page</h1>
      <TestEmailButton/>
    </div>
  )
}


