'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AuthLayout } from '../../_components/auth-layout';
import { useForgotPassword } from '@/hooks/auth/use-auth';
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
import { useTranslations } from 'next-intl';

const formSchema = z.object({
  email: z.string().email('Invalid email address')
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordView() {
  const { mutate: requestPasswordReset, isPending } = useForgotPassword();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const t = useTranslations();

  function onSubmit(values: FormValues) {
    requestPasswordReset(values);
  }

  return (
    <AuthLayout
      title={t('resetPassword')}
      backgroundImage="/roods-signin-bg.png"
    >
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
                    className="border border-[#B2B2B2]/25 bg-[#F8F8F8] font-nunito placeholder:font-nunito"
                    {...field}
                  />
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
            {t('sendOTP')}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
