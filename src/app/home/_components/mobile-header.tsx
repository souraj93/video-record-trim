'use client';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import React, { ReactNode, useEffect, useState } from 'react';
import BackButton from './back-button';

interface HeaderProps {
  title?: string;
  backHref?: string;
  variant?: 'default' | 'simple';
  rightButton?: ReactNode;
  useHref?: boolean;
}

const MobileHeader = ({
  title = 'Amsterdam',
  backHref = '/home',
  variant = 'simple',
  rightButton,
  useHref
}: HeaderProps) => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute left-0">
        <BackButton href={backHref} variant={variant} useHref={useHref} />
      </div>

      <h2 className="text-xl leading-[2rem] font-bold text-main">{title}</h2>

      {rightButton && <div className="absolute right-0">{rightButton}</div>}
    </div>
  );
};

export default MobileHeader;
