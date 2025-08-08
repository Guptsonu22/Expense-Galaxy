
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  if (user) {
      return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center galaxy-gradient">
      <Card className="w-full max-w-sm bg-card/50 border-white/10">
        <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
                <Logo className="h-10 w-10 text-primary" />
                <h1 className="text-3xl font-headline font-semibold text-foreground">
                    Expense Galaxy
                </h1>
            </div>
          <CardTitle className="font-headline">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue to your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={signInWithGoogle} className="w-full">
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-72.2 64.5C305.1 99.4 279.1 88 248 88c-73.2 0-132.3 59.2-132.3 132S174.8 352 248 352c78.8 0 117.3-56.8 122.3-87.5h-122.3v-83.8h235.2c2.3 12.7 3.8 26.6 3.8 41.8z"></path></svg>
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
