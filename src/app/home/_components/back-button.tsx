import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface BackButtonProps {
  href?: string;
  variant?: 'default' | 'simple';
  className?: string;
  useHref?: boolean;
}

const BackButton = ({
  href = '/home',
  variant = 'default',
  className = '',
  useHref = false
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <div className={`flex items-center justify-start gap-4 ${className}`}>
      <button
        onClick={useHref ? () => router.push(href) : () => router.back()}
        className={
          variant === 'default'
            ? ' rounded-full p-2 bg-gray-500/50'
            : 'bg-transparent hover:bg-transparent'
        }
        style={{ borderRadius: '50%' }}
      >
        {variant === 'default' ? (
          <ChevronLeft size={24} color="#fff" />
        ) : (
          <ArrowLeft size={24} color="#134C37" />
        )}
      </button>
    </div>
  );
};

export default BackButton;
