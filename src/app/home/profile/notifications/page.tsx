'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import MobileHeader from '../../_components/mobile-header';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useTranslations } from 'next-intl';
import {
  useProfile,
  useUpdateProfile
} from '@/hooks/profile/use-profile';
import { useEffect } from 'react';

export default function AccountNotificationsPage() {
  const t = useTranslations();

  const { data: profileData, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const FormSchema = z.object({
    notifications: z.boolean().default(false).optional()
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      notifications: profileData?.data.isNotificationEnabled
    }
  });

  useEffect(() => {
    if (profileData?.data) {
      const { isNotificationEnabled } = profileData?.data
      console.log("isNotificationEnabled", isNotificationEnabled)
      form.reset({
        notifications: profileData?.data.isNotificationEnabled
      })
    }
  }, [profileData, form])

  function onSubmit(values: z.infer<typeof FormSchema>) {

    const updateData = {
      isNotificationEnabled: values.notifications
    }
    updateProfile(updateData);
  }

  return (
    <PageContainer>
      <div className="flex flex-col bg-white p-4">
        <MobileHeader
          title={t('notifications')}
          backHref="/home/profile"
          variant="simple"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 w-full space-y-6"
          >
            <div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="notifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg">
                      <div className="space-y-0.5">
                        <FormLabel>{t('notifications')}</FormLabel>
                        <FormDescription>
                          {t('turnOnNotification')}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-main"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-[414px] flex-col gap-3 bg-white p-4">
              <Button
                type="submit"
                className="w-full rounded-lg bg-[#134C37] px-4 py-3 font-nunito text-[0.875rem] font-extrabold text-white hover:bg-[#134C37]/90"
                size="simple"
              >
                {t('save')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageContainer>
  );
}
