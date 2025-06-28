'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  backButtonLabel?: string;
  backButtonHref?: string;
  title: string;
  backgroundImage: string;
}

export function AuthLayout({
  children,
  backButtonLabel,
  backButtonHref,
  title,
  backgroundImage
}: AuthLayoutProps) {
  return (
    <div className="w-full bg-white md:min-w-[414px]">
      <div className="relative flex h-screen flex-col">
        {backButtonHref && (
          <Link
            href={backButtonHref}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'absolute right-4 top-4 z-10'
            )}
          >
            {backButtonLabel}
          </Link>
        )}

        <div className="relative h-[40%] w-full">
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt="background"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
            <Image
              alt="logo"
              src="/roods-logo-white.svg"
              width={150}
              height={150}
              className="drop-shadow-md"
            />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        <div className="flex flex-grow flex-col items-center px-8 py-6">
          <>
            <h1 className="font-poppins text-2xl font-bold tracking-tight text-main">
              {title}
            </h1>
          </>
          <div className="mt-6 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
