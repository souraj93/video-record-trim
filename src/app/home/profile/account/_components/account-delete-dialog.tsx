'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
interface AccountDeleteDialogProps {
  handleDeleteProfile: () => void;
}

export function AccountDeleteDialog({
  handleDeleteProfile
}: AccountDeleteDialogProps) {
  const t = useTranslations();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="w-full rounded-lg border bg-red-600 px-4 py-3 font-nunito text-sm font-extrabold text-white hover:bg-red-600"
        >
          {t('deleteProfile')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" max-w-[414px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProfile} className="bg-main">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
