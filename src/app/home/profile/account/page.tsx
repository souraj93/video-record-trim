'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/layout/page-container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import MobileHeader from '../../_components/mobile-header';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import {
  useProfile,
  useUpdateProfile,
  useAccountDelete
} from '@/hooks/profile/use-profile';
import { AccountDeleteDialog } from './_components/account-delete-dialog';
import { useTranslations } from 'next-intl';

const genders = [
  { value: '1', label: 'Male' },
  { value: '2', label: 'Female' },
  { value: '3', label: 'Other' }
];

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  nationality: z.string().min(1, { message: 'Nationality is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  countryCode: z.string().min(1, { message: 'Country code is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  dob: z.date({
    required_error: 'Date of birth is required'
  })
});

type FormValues = z.infer<typeof formSchema>;

export default function AccountPage() {
  const { data, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { mutate: deleteAccount } = useAccountDelete();

  console.log('data', data);

  const t = useTranslations();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      nationality: '',
      phoneNumber: '',
      countryCode: '',
      gender: '',
      dob: undefined
    }
  });

  useEffect(() => {
    if (data?.data?.personalInfo) {
      const { personalInfo } = data.data;
      console.log('Gender from API:', personalInfo.gender);

      const genderValue =
        personalInfo.gender !== undefined && personalInfo.gender !== null
          ? String(personalInfo.gender)
          : '';

      console.log('Setting gender value to:', genderValue);

      form.reset({
        firstName: personalInfo.firstName || '',
        lastName: personalInfo.lastName || '',
        nationality: personalInfo.nationality || '',
        phoneNumber: personalInfo.phone?.number || '',
        countryCode: personalInfo.phone?.countryCode || '',
        gender: genderValue,
        dob: personalInfo.dob ? new Date(personalInfo.dob) : undefined
      });
    }
  }, [data, form]);

  function onSubmit(values: FormValues) {
    const updateData = {
      personalInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
        nationality: values.nationality,
        phone: {
          countryCode: values.countryCode,
          number: values.phoneNumber
        },
        gender: String(values.gender),
        dob: values.dob.toISOString()
      }
    };
    console.log('updateprofile', updateData);
    updateProfile(updateData);
  }

  function handleDeleteProfile() {
    deleteAccount();
    console.log('Delete profile clicked');
  }

  const currentGender = form.watch('gender');
  console.log('Current gender value in form:', currentGender);

  return (
    <PageContainer>
      <div className="flex flex-col bg-white p-4">
        <MobileHeader
          title={t('myAccount')}
          backHref="/home/profile"
          variant="simple"
        />
        {!isLoading ? (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 flex flex-col justify-around gap-6 pb-32"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          {t('placeHolderFirstName')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-white px-4 py-3 focus-visible:ring-1 focus-visible:ring-[#134C37]"
                            placeholder={t('whatIsFirstName')}
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
                        <FormLabel className="text-sm font-medium text-gray-700">
                          {t('placeHolderLastName')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-white px-4 py-3 focus-visible:ring-1 focus-visible:ring-[#134C37]"
                            placeholder={t('whatIsLastName')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          {t('nationality')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="rounded-lg border-gray-200 bg-white px-4 py-3 focus-visible:ring-1 focus-visible:ring-[#134C37]"
                            placeholder={t('nationality')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          {t('phoneNumber')}
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            value={field.value}
                            onChange={field.onChange}
                            defaultCountry=""
                            onCountryChange={(country) => {
                              form.setValue('countryCode', country || '');
                            }}
                            className="rounded-lg [&>input]:border-gray-200 [&>input]:bg-white [&>input]:px-4 [&>input]:py-3 [&>input]:focus-visible:ring-1 [&>input]:focus-visible:ring-[#134C37]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          {t('selectGender')}
                        </FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between rounded-lg border-gray-200 bg-white px-4 py-3 font-normal text-black hover:bg-white focus:ring-1 focus:ring-[#134C37]"
                              >
                                {field.value
                                  ? genders.find(
                                      (gender) => gender.value === field.value
                                    )?.label
                                  : 'Select your gender'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full bg-white p-0">
                              <Command className="bg-white">
                                <CommandInput
                                  placeholder={t('selectGender')}
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    No gender option found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {genders.map((gender) => (
                                      <CommandItem
                                        key={gender.value}
                                        value={gender.value}
                                        onSelect={(currentValue) => {
                                          form.setValue('gender', currentValue);
                                        }}
                                      >
                                        {gender.label}
                                        <Check
                                          className={cn(
                                            'ml-auto',
                                            field.value === gender.value
                                              ? 'opacity-100'
                                              : 'opacity-0'
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          {t('selectBirthDate')}
                        </FormLabel>
                        <FormControl>
                          <div className="rounded-lg focus-within:ring-1 focus-within:ring-[#134C37]">
                            <DateTimePicker
                              hideTime
                              value={field.value || new Date()}
                              onChange={field.onChange}
                              className="w-full"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-[414px] flex-col gap-3 bg-white p-4">
                  <Button
                    type="submit"
                    className="w-full rounded-lg bg-[#134C37] px-4 py-3 font-nunito text-sm font-extrabold text-white hover:bg-[#134C37]/90"
                    disabled={isPending}
                  >
                    {isPending ? 'Updating...' : `${t('updateProfile')}`}
                  </Button>

                  <AccountDeleteDialog
                    handleDeleteProfile={handleDeleteProfile}
                  />
                </div>
              </form>
            </Form>
          </>
        ) : (
          <>
            <div className="flex h-screen flex-col items-center justify-center">
              <p>Loading profile data...</p>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}
