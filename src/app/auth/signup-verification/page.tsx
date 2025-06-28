import { Metadata } from 'next';
import SignUpVerificationViewPage from './_components/signup-verification-view';

export const metadata: Metadata = {
  title: 'Sign Up Verification | Roods',
  description: 'Verfy your Roods Account'
};

export default function SignUpVerificationPage() {
  return <SignUpVerificationViewPage />;
}
