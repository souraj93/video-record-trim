'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';

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

interface StoryData {
  _id: string;
  images: string[];
  languageDetails: LanguageDetailsArray;
  distance?: string;
  length?: string;
  excerpt?: string;
  duration?: string;
  description?: string;
}

interface StorySelectorProps {
  data: StoryData;
  hideDescription?: boolean;
  showDeleteButton?: boolean;
  onAddStory?: (storyId: string) => void;
  onRemoveStory?: (storyId: string) => void;
  isAdded?: boolean;
}

const StorySelector = ({
  data,
  hideDescription = false,
  showDeleteButton = false,
  onAddStory,
  onRemoveStory,
  isAdded = false
}: StorySelectorProps) => {
  const handleAddStory = () => {
    if (onAddStory && data._id) {
      onAddStory(data._id);
      toast.success(`Added "${data.languageDetails[0].name}" to your route`);
    }
  };

  const handleRemoveStory = () => {
    if (onRemoveStory && data._id) {
      onRemoveStory(data._id);
      toast.success(
        `Removed "${data.languageDetails[0].name}" from your route`
      );
    }
  };

  return (
    <>
      <Card className="rounded-lg border-0 shadow-md">
        <div className="relative h-48">
          <Image
            src={data?.images[0]}
            alt={data?.languageDetails[0].name}
            fill
            className="h-full w-full rounded-lg object-cover shadow-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
              {!isAdded ? (
                <div className="flex flex-col items-center">
                  <Button
                    variant={null}
                    onClick={handleAddStory}
                    className="flex h-14 w-14 items-center justify-center"
                  >
                    <Image
                      src="/icons/plus_icon_white.svg"
                      alt="Add"
                      width={40}
                      height={40}
                    />
                  </Button>
                  <span className="-mt-2 text-sm font-medium text-white">
                    Add Story to route
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Button
                    variant={null}
                    onClick={handleRemoveStory}
                    className="flex h-14 w-14 items-center justify-center"
                  >
                    {/* <Trash2Icon size={32} color="white" /> */}
                  </Button>
                  {/* <span className="text-sm -mt-2 font-medium text-white">
                    Remove from route
                  </span> */}
                </div>
              )}
            </div>
          </div>
          {showDeleteButton && (
            <div
              className="absolute right-0 top-0 m-2 cursor-pointer rounded-full bg-white p-1.5"
              onClick={handleRemoveStory}
            >
              <Trash2Icon size={16} className="text-red-700" />
            </div>
          )}
        </div>
        {!hideDescription && (
          <CardContent className="p-4">
            <div className="overflow-hidden">
              <p className="text-lg font-medium text-black">
                {data?.languageDetails[0].name}
              </p>
              <p className="mt-1 line-clamp-3 text-sm text-gray-700">
                {data?.languageDetails[0].description ||
                  data?.languageDetails[0].introductoryText}
              </p>
            </div>
            <Button
              variant="link"
              size="sm"
              className="mt-2 p-0 font-medium text-green-800"
            >
              Read more
            </Button>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default StorySelector;
