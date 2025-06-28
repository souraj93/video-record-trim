'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ArticleCard from './article-card';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/config/utilities';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const FavouriteRoutes = ({
  routeData,
  cityId,
  classNames,
  showTitle = true,
  showDeleteButton = false,
  remove
}: any) => {
  const router = useRouter();
  const linkPush = (id: string) => {
    isLoggedIn()
      ? router.push(`/home/routes/${id}`)
      : router.push(`/route/${id}`);
  };
  const t = useTranslations();
  return (
    <section className={cn('mt-8', classNames)}>
      {showTitle && (
        <div className="mb-4 flex items-center justify-between">
          <motion.h2
            className="text-lg font-semibold text-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {t('favoriteRoutes')}
          </motion.h2>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {routeData?.map((route, index) => (
          <motion.div
            key={route._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index + 0.5 }}
            className="w-full hover:cursor-pointer"
            onClick={() => linkPush(route._id)}
          >
            <ArticleCard data={route} showDeleteButton={showDeleteButton} remove={remove ? () => remove(route._id) : () => {}} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FavouriteRoutes;
