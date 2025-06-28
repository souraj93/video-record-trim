'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Home, Menu, Map, User } from 'lucide-react';
import { CITY_ID } from '@/config/cookie-keys';
import { isLoggedIn } from '@/config/utilities';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
  isPrivate?: boolean;
}

const NavItem = ({ href, icon, isActive, isPrivate }: NavItemProps) => {
  const router = useRouter();
  const navigate = () => {
    if (isPrivate && !isLoggedIn()) {
      router.push('/auth/sign-in');
    } else {
      router.push(href);
    }
  };
  return (
    <button
      onClick={navigate}
      className={cn(
        'flex flex-1 flex-col items-center justify-center bg-white pb-2 pt-2',
        isActive ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      {icon}
    </button>
  );
};

const MobileBottomNav = () => {
  const [currentCityId, setCurrentCityId] = useState('');
  const pathname = usePathname();
  const logoPath = '/roods-logo-icon.png';

  const cityIdToken = Cookies.get(CITY_ID);

  useEffect(() => {
    if (cityIdToken) {
      setCurrentCityId(cityIdToken);
    }
  }, [cityIdToken]);

  const navItems = [
    {
      href: '/home/cities/' + currentCityId,
      icon: <Home size={20} />,
      label: 'Home'
    },
    {
      href: '/home/routes/explore/' + currentCityId,
      icon: <Map size={20} />,
      label: 'Map'
    },
    {
      href: '/home/cities/' + currentCityId + '/routes/',
      icon: <Image src={logoPath} alt="Roods Logo" width={30} height={30} />,
      label: 'Restricted',
      isPrivate: true
    },

    {
      href: '/home/cities/' + currentCityId + '/explore/',
      icon: <Menu size={20} />,
      label: 'Menu'
    },
    {
      href: '/home/profile',
      icon: <User size={20} />,
      label: 'Profile',
      isPrivate: true
    }
  ];

  return (
    <div className="z-50 w-full rounded-t-2xl border-t border-border bg-background shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <nav className="flex justify-between px-2">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            isActive={pathname === item.href}
            isPrivate={item.isPrivate}
          />
        ))}
      </nav>
    </div>
  );
};

export default MobileBottomNav;
