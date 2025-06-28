'use client';

import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { AuthLayout } from '../../_components/auth-layout';
import ResetPasswordForm from './reset-password-form';

export default function ResetPasswordView() {
  const t = useTranslations();
  return (
    <AuthLayout
      title={t('resetPassword')}
      backgroundImage="/signup-verification-bg.png"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
