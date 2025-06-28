'use client';

import Image from 'next/image';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { AuthLayout } from '../../_components/auth-layout';
import {
  useLogin,
  useSignUpVerification,
  useSignUpVerificationResend
} from '@/hooks/auth/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from '@/components/ui/input-otp';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().min(5, {
    message: 'Your one-time password must be 5 characters.'
  })
});

type FormValues = z.infer<typeof formSchema>;

export default function SignUpVerificationViewPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const { mutate: signUpVerification, isPending } = useSignUpVerification();
  const { mutate: signUpVerificationResend, isPending: isResendPending } =
    useSignUpVerificationResend();

  const t = useTranslations();

  const [cooldown, setCooldown] = useState(0);
  const COOLDOWN_TIME = 30;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      otp: ''
    }
  });

  function onSubmit(values: FormValues) {
    console.log('values', values);
    signUpVerification(values);
  }

  const handleResendOTP = () => {
    if (email && cooldown === 0) {
      signUpVerificationResend({ email });
      setCooldown(COOLDOWN_TIME);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldown]);

  return (
    <AuthLayout title={t('otp')} backgroundImage="/signup-verification-bg.png">
      <div>
        <p className="mb-8 text-center">{t('sendYouEmailDesc')}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  {/* <FormLabel>One-Time Password</FormLabel> */}
                  <FormControl>
                    <InputOTP
                      maxLength={5}
                      {...field}
                      className="flex justify-center"
                    >
                      <InputOTPGroup className="flex items-center justify-center gap-2 sm:gap-6">
                        <InputOTPSlot
                          index={0}
                          className="aspect-square w-10 rounded-lg border sm:w-12"
                        />
                        <InputOTPSlot
                          index={1}
                          className="aspect-square w-10 rounded-lg border sm:w-12"
                        />
                        <InputOTPSlot
                          index={2}
                          className="aspect-square w-10 rounded-lg border sm:w-12"
                        />
                        <InputOTPSlot
                          index={3}
                          className="aspect-square w-10 rounded-lg border sm:w-12"
                        />
                        <InputOTPSlot
                          index={4}
                          className="aspect-square w-10 rounded-lg border sm:w-12"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="mt-4 flex justify-center">
              <Button
                variant="link"
                type="button"
                onClick={handleResendOTP}
                disabled={isResendPending || cooldown > 0}
                className="text-main hover:text-main/80"
              >
                {isResendPending ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : cooldown > 0 ? (
                  `Resend OTP in ${cooldown}s`
                ) : (
                  "Didn't receive code? Resend OTP"
                )}
              </Button>
            </div> */}

            <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-[414px] flex-col gap-3 p-4">
              <Button
                className="mt-2 w-full bg-main hover:bg-main"
                size={'simple'}
                type="submit"
                disabled={isPending}
              >
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t('signIn')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}
