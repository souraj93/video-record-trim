'use client';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MobileBottomNav from './mobile-nav';

export default function PageContainer({
  children,
  scrollable = true,
  mobileNavPage = false
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  mobileNavPage?: boolean;
}) {
  return (
    <div className="relative flex h-[calc(100dvh)] flex-col">
      {scrollable ? (
        <ScrollArea className="flex-1 overflow-auto">
          <div className="pb-14 md:min-w-[414px]">{children}</div>
        </ScrollArea>
      ) : (
        <div className="flex-1 pb-14">{children}</div>
      )}
      {mobileNavPage ? (
        <div className="absolute bottom-0 left-0 right-0">
          <MobileBottomNav />
        </div>
      ) : null}
    </div>
  );
}
