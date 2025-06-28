'use client';

import Image from 'next/image';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AuthLayout } from '../../_components/auth-layout';
import { useLogin, useSocialLogin } from '@/hooks/auth/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { signIn, useSession } from "next-auth/react";
import { da } from 'date-fns/locale';
import Cookies from 'js-cookie';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInView() {
  const { data } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();
  const { mutate: socialLogin } = useSocialLogin();
  let socialLoginCalled = false;

  const t = useTranslations();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // console.log('data', data);

  useEffect(() => {
    if (data?.user && data?.user?.email && !socialLoginCalled) {
      socialLoginCalled = true;
      socialLogin({
        "email": data?.user?.email,
        "socialId": data?.user?.id, 
        "provider": Cookies.get('loginType'),
        "firstName": data?.user?.name?.split(' ')[0],
        "lastName": data?.user?.name?.split(' ')[1],
      })
      Cookies.remove('loginType');
    }
  }, [data]);

  function onSubmit(values: FormValues) {
    login(values);
  }

  return (
    <AuthLayout title={t('signIn')} backgroundImage="/roods-signin-bg.png">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">{t('placeHolderEmail')}</Label>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('placeHolderEmail')}
                      disabled={isPending}
                      {...field}
                      className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-nunito placeholder:font-nunito"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">{t('placeHolderPassword')}</Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        disabled={isPending}
                        {...field}
                        className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-nunito placeholder:font-nunito"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isPending}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right text-sm">
              <Link
                href="/auth/forgot-password"
                className="text-main underline-offset-4 hover:underline"
              >
                {t('forgotPassword')}
              </Link>
            </div>
            <Button
              className="mt-2 w-full bg-main hover:bg-main"
              type="submit"
              size={'simple'}
              disabled={isPending}
            >
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {t('signIn')}
            </Button>
          </form>
        </Form>
        <div className="mt-4">
          <div className="flex items-center">
            <div className="border-1 flex-grow border-t border-gray-400"></div>
            <div className="px-3 text-sm font-bold text-gray-500">
              {t('or')}
            </div>
            <div className="border-1 flex-grow border-t border-gray-400"></div>
          </div>

          <div className="mt-2 flex items-center justify-center gap-4">
            <div className="rounded-md bg-white p-2 shadow-lg cursor-pointer" onClick={() => {
              Cookies.set('loginType', 'google');
              signIn("google")
            }}>
              <Image
                alt="Google Icon"
                src="/icons/google_icon.svg"
                width={20}
                height={20}
              />
            </div>
            <div className="rounded-md bg-white p-2 shadow-lg cursor-pointer" onClick={() => {
              Cookies.set('loginType', 'facebook');
              signIn("facebook")
            }}>
              <Image
                alt="Facebook Icon"
                src="/icons/facebook_icon.svg"
                className=""
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center text-center font-nunito text-sm">
            <p>{t('doNotHaveAccount')}</p>
            <Link
              href="/auth/sign-up"
              className="ml-2 text-main underline underline-offset-4"
            >
              {t('signUp')}
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
