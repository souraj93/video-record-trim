'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResetPassword } from '@/hooks/auth/use-auth';
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
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';

const formSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    otp: z.string().min(4, 'OTP must be at least 4 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type FormValues = z.infer<typeof formSchema>;

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const { mutate: resetPassword, isPending } = useResetPassword();

  const t = useTranslations();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email,
      otp: '',
      password: '',
      confirmPassword: ''
    }
  });

  function onSubmit(values: FormValues) {
    const { confirmPassword, ...resetPasswordValues } = values;
    resetPassword(resetPasswordValues);
  }

  return (
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
                  disabled={true}
                  className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-nunito placeholder:font-nunito"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="otp">{t('otp')}</Label>
              <FormControl>
                <Input
                  id="otp"
                  placeholder={t('otp')}
                  className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-nunito placeholder:font-nunito"
                  {...field}
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
              <Label htmlFor="password">{t('placeHolderNewPassword')}</Label>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-nunito placeholder:font-nunito"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
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
                    className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-nunito placeholder:font-nunito"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? 'Hide password' : 'Show password'}
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
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {t('resetPassword')}
        </Button>
      </form>
    </Form>
  );
}
