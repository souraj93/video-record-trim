import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { DeleteIcon, Trash2Icon } from 'lucide-react';
import { checkLanguageOrSetDefault } from '@/config/utilities';
import { useTranslations } from 'next-intl';
interface LanguageRef {
  _id: string;
  name: string;
  code: string;
  status: number;
}
interface LanguageDetailsItems {
  languageRef: LanguageRef;
  name: string;
  introductoryText: string;
  description?: string;
  _id?: string;
}

type LanguageDetailsArray = LanguageDetailsItems[];
interface ArticleCardProps {
  data: {
    images: string[];
    languageDetails: LanguageDetailsArray;
    distance?: string;
    length?: string;
    excerpt?: string;
    duration?: string;
    description?: string;
  };
  hideDescription?: boolean;
  showDeleteButton?: boolean;
  remove: Function;
}

const ArticleCard = ({
  data,
  hideDescription = false,
  showDeleteButton = false,
  remove,
  onClickFunc
}: ArticleCardProps) => {
  const t = useTranslations();
  return (
    <>
      <Card
        className="cursor-pointer rounded-lg border-0 shadow-md"
        onClick={onClickFunc ? onClickFunc : () => {}}
      >
        <div className="relative h-48">
          {data?.images[0] ?
          <Image
            src={data?.images[0]}
            alt={checkLanguageOrSetDefault(data?.languageDetails).name}
            fill
            className="h-full w-full rounded-lg object-cover shadow-lg"
          /> : 
          <Image
            src={'/roods-logo.png'}
            alt={checkLanguageOrSetDefault(data?.languageDetails).name}
            width={100}
            height={100}
            className="h-full w-full rounded-lg shadow-lg"
          />}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <p className="text-lg font-medium text-white">
              {checkLanguageOrSetDefault(data?.languageDetails).name}
            </p>
            {data?.dist ?
            <span className='text-white'>
              {data.dist}
            </span> : null}
          </div>
          {showDeleteButton && (
            <div
              className="absolute right-0 top-0 m-2 cursor-pointer rounded-full bg-white p-1.5"
              onClick={(e) => {
                e.stopPropagation();
                remove(data);
              }}
            >
              <Trash2Icon size={16} />
            </div>
          )}
        </div>
        {!hideDescription && (
          <CardContent className="p-4">
            <div className="overflow-hidden">
              <p className="line-clamp-3 text-sm text-gray-700">
                {checkLanguageOrSetDefault(data?.languageDetails).description ||
                  checkLanguageOrSetDefault(data?.languageDetails)
                    .introductoryText}
              </p>
            </div>
            <Button
              variant="link"
              size="sm"
              className="mt-2 p-0 font-medium capitalize text-green-800"
            >
              {t('viewAll')}
            </Button>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default ArticleCard;
