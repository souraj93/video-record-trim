'use client';
import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronRight,
  Globe2,
  Bookmark,
  Bell,
  HelpCircle,
  Users,
  LogOut,
  ChevronLeft,
  HandCoinsIcon,
  X
} from 'lucide-react';
import { signOut } from "next-auth/react";

import Link from 'next/link';
import MobileBottomNav from '@/components/layout/mobile-nav';
import { useTranslations } from 'next-intl';
import { CheckIcon } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { useTransition } from 'react';
import { Locale, defaultLocale } from '@/i18n/config';
import { setUserLocale, getUserLocale } from '@/services/locale.service';
import MobileHeader from '../../_components/mobile-header';
import { AUTH_TOKEN, PREFERRED_LANGUAGE } from '@/config/cookie-keys';
import Cookies from 'js-cookie';
import {
  useLanguages,
  useUpdateLanguagePreference
} from '@/hooks/settings/use-language';
import { useLogout, useProfile } from '@/hooks/profile/use-profile';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  href: string;
  onClick?: () => void;
}

const MenuItem = ({ icon, title, subtitle, href, onClick }: MenuItemProps) => (
  <Link
    href={href}
    className="flex items-center justify-between rounded-lg p-4 transition-colors hover:bg-gray-50"
    onClick={onClick}
  >
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#134C37]/10 text-[#134C37]">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
    <ChevronRight className="h-5 w-5 text-gray-400" />
  </Link>
);

export default function ProfilePageView() {
  const t = useTranslations();

  const router = useRouter();

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState<string>(defaultLocale);
  const [selectedLocale, setSelectedLocale] = useState<string>(defaultLocale);
  const [languageOptions, setLanguages] = useState([
    { value: 'en', label: 'English' }
  ]);

  const { data: languageData } = useLanguages({
    skip: 0,
    limit: 0
  });

  const { data: profileData, isLoading } = useProfile();

  console.log(
    profileData?.data.personalInfo.firstName +
    ' ' +
    profileData?.data.personalInfo.lastName
  );

  const { mutate: logout, isPending: isUserLogingOut } = useLogout();

  const { mutate: updatePreference } = useUpdateLanguagePreference();

  const updateLanguage = (lang: string) => {
    updatePreference(lang);
    setCurrentLocale(lang);
    setSelectedLocale(lang);
    setIsLanguageModalOpen(false);
    Cookies.set(PREFERRED_LANGUAGE, lang);
    window.location.reload();
  };

  useEffect(() => {
    const lang = Cookies.get(PREFERRED_LANGUAGE);
    if (lang) {
      setSelectedLocale(lang);
      setCurrentLocale(lang);
      setIsLanguageModalOpen(false);
    }
  }, []);

  useEffect(() => {
    if (languageData?.data?.data?.length) {
      setLanguages(
        languageData?.data?.data.map((each) => {
          return {
            value: each.code,
            label: each.name,
            _id: each._id
          };
        })
      );
    }
  }, [languageData]);

  function handleOpenLanguageModal() {
    setSelectedLocale(currentLocale);
    setIsLanguageModalOpen(true);
  }

  async function handleSaveLanguage() {
    if (selectedLocale === currentLocale) {
      setIsLanguageModalOpen(false);
      return;
    }

    const locale = selectedLocale as Locale;
    startTransition(async () => {
      try {
        await setUserLocale(locale);
        setCurrentLocale(locale);
        // Refresh the page to apply the new locale
        // window.location.reload();
      } catch (error) {
        console.error('Failed to set user locale:', error);
      } finally {
        setIsLanguageModalOpen(false);
      }
    });
  }

  function handleCancelLanguageChange() {
    setSelectedLocale(currentLocale);
    setIsLanguageModalOpen(false);
  }

  const getCurrentLanguageLabel = () => {
    const language = languageOptions.find(
      (option) => option.value === currentLocale
    );
    return language ? language.label : 'English';
  };

  const handleLogoutClick = () => {
    signOut({ redirect: false });
    setTimeout(() => {
      logout();
    }, 1000);
  };

  return (
    <PageContainer scrollable={true} mobileNavPage={true}>
      <div className="mx-auto flex w-full flex-col p-4 pb-20">
        <MobileHeader
          title={t('profile')}
          backHref="/home/cities"
          variant="simple"
        />

        <div className="mb-6 mt-8 rounded-xl border border-[#134C37] bg-[#134C37] py-3 shadow-2xl">
          <div className="flex items-center gap-3 p-4">
            <div className='relative h-[4rem] w-[4rem]'>
              <Image alt="profile" src="/roods-profile.svg" className='object-contain bg-white p-1 rounded-full' fill />
            </div>

            {/* <Avatar className="h-20 w-20 border-2 border-white bg-white">
              <AvatarImage src="/roods-profile.png" />
              <AvatarFallback>PE</AvatarFallback>
            </Avatar> */}
            {profileData?.data?.personalInfo && (
              <span className="text-base font-semibold text-white">
                {profileData.data.personalInfo.firstName + ' ' + profileData.data.personalInfo.lastName}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col divide-y divide-gray-100">
          <MenuItem
            icon={<Users className="h-5 w-5" />}
            title={t('profile')}
            subtitle={t('makeChangesAccount')}
            href="/home/profile/account"
          />
          <div
            className="flex cursor-pointer items-center justify-between rounded-lg p-4 transition-colors hover:bg-gray-50"
            onClick={handleOpenLanguageModal}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#134C37]/10 text-[#134C37]">
                <Globe2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {t('languages')}
                </h3>
                <p className="text-xs text-gray-500">
                  {getCurrentLanguageLabel()}
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
          <MenuItem
            icon={<HandCoinsIcon className="h-5 w-5" />}
            title={t('donate')}
            subtitle={t('donateForPlatformRunning')}
            href="/home/profile/donate"
          />
          <MenuItem
            icon={<Bookmark className="h-5 w-5" />}
            title={t('savedStories')}
            subtitle={t('manageSavedStoriesRoutes')}
            href="/home/profile/saved"
          />
          <MenuItem
            icon={<Bell className="h-5 w-5" />}
            title={t('appNotifications')}
            subtitle={t('manageNotifications')}
            href="/home/profile/notifications"
          />
          <MenuItem
            icon={<HelpCircle className="h-5 w-5" />}
            title={t('helpAndSupport')}
            subtitle={t('getInTouch')}
            href="/home/profile/support"
          />
          {/* <MenuItem
            icon={<Users className="h-5 w-5" />}
            title={t('collaborations.title')}
            subtitle={t('collaborations.subtitle')}
            href="/home/profile/collaborations"
          /> */}
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-4 p-4 text-red-600 transition-colors hover:bg-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <LogOut className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">{t('logOut')}</span>
          </button>
        </div>
      </div>

      <Dialog.Root
        open={isLanguageModalOpen}
        onOpenChange={setIsLanguageModalOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed bottom-0 left-0 right-0 mx-auto max-w-[414px] rounded-t-xl bg-white p-6 duration-300 animate-in slide-in-from-bottom">
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-lg font-medium">
                {t('selectLanguage')}
              </Dialog.Title>
              <Dialog.Close className="rounded-full p-1 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>

            <div className="mb-6 divide-y divide-gray-100">
              {languageOptions.map((language) => (
                <button
                  key={language.value}
                  className="flex w-full items-center justify-between py-3"
                  onClick={() => updateLanguage(language.value)}
                  disabled={isPending}
                >
                  <span
                    className={clsx(
                      'text-base',
                      selectedLocale === language.value
                        ? 'font-medium text-[#134C37]'
                        : 'text-gray-700'
                    )}
                  >
                    {language.label}
                  </span>
                  {selectedLocale === language.value && (
                    <CheckIcon className="h-5 w-5 text-[#134C37]" />
                  )}
                </button>
              ))}
            </div>

            {/* <div className="flex space-x-3">
              <button
                onClick={handleCancelLanguageChange}
                className="flex-1 rounded-lg border border-gray-300 py-3 font-medium text-gray-700"
                disabled={isPending}
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleSaveLanguage}
                className="flex-1 rounded-lg bg-[#134C37] py-3 font-medium text-white"
                disabled={isPending || selectedLocale === currentLocale}
              >
                {t('save')}
              </button>
            </div> */}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </PageContainer>
  );
}
