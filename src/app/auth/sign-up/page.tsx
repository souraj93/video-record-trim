import { Metadata } from 'next';
import SignUpViewPage from './_components/signup-view';

export const metadata: Metadata = {
  title: 'Sign Up | Roods',
  description: 'Sign Up for Roods'
};

export default function SignInPage() {
  return <SignUpViewPage />;
}
