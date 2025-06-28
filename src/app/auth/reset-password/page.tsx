import { Metadata } from 'next';
import ResetPasswordView from './_components/reset-password-view';

export const metadata: Metadata = {
  title: 'Reset Password | Roods',
  description: 'Reset password'
};

export default function ResetPasswordPage() {
  return <ResetPasswordView />;
}
