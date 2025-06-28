'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';
import { AuthLayout } from '../../_components/auth-layout';
import { useSignUp } from '@/hooks/auth/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignUpView() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: signUp, isPending } = useSignUp();

  const t = useTranslations();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  function onSubmit(values: FormValues) {
    const { confirmPassword, ...signUpValues } = values;
    signUp(signUpValues);
  }

  return (
    <AuthLayout title={t('signUp')} backgroundImage="/roods-signup-bg.png">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <Label htmlFor="email">{t('placeHolderEmail')}</Label>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('placeHolderEmail')}
                    disabled={isPending}
                    className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-poppins placeholder:font-poppins"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="firstName">{t('placeHolderFirstName')}</Label>
                  <FormControl>
                    <Input
                      id="firstName"
                      placeholder={t('placeHolderFirstName')}
                      disabled={isPending}
                      className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-poppins placeholder:font-poppins"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="lastName">{t('placeHolderLastName')}</Label>
                  <FormControl>
                    <Input
                      id="lastName"
                      placeholder={t('placeHolderLastName')}
                      disabled={isPending}
                      className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-poppins placeholder:font-poppins"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                      className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-poppins placeholder:font-poppins"
                      {...field}
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="confirmPassword">
                  {t('placeHolderConfirmPassword')}
                </Label>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="********"
                      disabled={isPending}
                      className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-poppins placeholder:font-poppins"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isPending}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? 'Hide password'
                          : 'Show password'}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-main hover:bg-main"
            type="submit"
            size={'simple'}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t('signUp')}
          </Button>

          <div className="text-center text-sm">
            {t('alreadyHaveAccount')}{' '}
            <Link
              href="/auth/sign-in"
              className="font-medium text-main underline-offset-4 hover:underline"
            >
              {t('login')}
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
