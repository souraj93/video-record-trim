'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import MobileHeader from '@/app/home/_components/mobile-header';
import { checkLanguageOrSetDefault } from '@/config/utilities';
import { useAddRoute } from '@/hooks/route/use-route';

interface SaveCreatedRoutePageProps {
  cityId: string;
}

interface FormValues {
  uniqueId: string;
  routeName: string;
  routeDescription: string;
}

interface StoryReference {
  _id: string;
  fullAddress: string;
  uniqueId: string;
  images: any[];
  languageDetails: any;
  status: string;
}

export default function SaveCreatedRouteDetailPage({
  cityId
}: SaveCreatedRoutePageProps) {
  const [routeStops, setRouteStops] = useState<any[]>([]);
  const router = useRouter();
  const { mutate: addRoute, isPending: isAddPending } = useAddRoute();

  console.log('aaa', cityId);

  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    defaultValues: {
      uniqueId: '',
      routeName: '',
      routeDescription: ''
    }
  });

  useEffect(() => {
    // Get storyRefs from localStorage
    const storyRefsFromStorage = localStorage.getItem('storyRefs');

    if (storyRefsFromStorage) {
      try {
        const storyRefs = JSON.parse(storyRefsFromStorage) as StoryReference[];

        if (storyRefs.length) {
          setRouteStops(
            storyRefs.map((story: any, index: number) => ({
              _id: story._id,
              id: `stop-${index + 1}`,
              cityRef: story.cityRef,
              title: checkLanguageOrSetDefault(story.languageDetails)?.name,
              description: checkLanguageOrSetDefault(story.languageDetails)
                ?.description,
              languageDetails: story.languageDetails,
              image: story.images[0],
              lat: story.fullAddress.location.coordinates[1],
              lng: story.fullAddress.location.coordinates[0]
            }))
          );
        }
      } catch (error) {
        console.error('Error parsing storyRefs from localStorage:', error);
      }
    }
  }, []);

  const onSubmit = (data: FormValues) => {
    // Extract just the _ids from the storyRefs
    const storyRefIds = routeStops.map((stop) => stop._id);

    // Prepare data in the required format
    const routeData = {
      uniqueId: data.uniqueId,
      cityRef: cityId,
      languageDetails: [
        {
          languageRef: '678019927f32c438b21ddd76', // Using the constant language reference
          name: data.routeName,
          introductoryText: data.routeDescription
        }
      ],
      storyRefs: storyRefIds
    };

    console.log('Submitting route data:', routeData);

    // Call the addRoute mutation
    addRoute(routeData, {
      onSuccess: () => {
        // Clear the storyRefs from localStorage after successful save
        localStorage.removeItem('storyRefs');
        router.push(`/home/cities/${cityId}/routes`);
      },
      onError: (error) => {
        console.error('Error adding route:', error);
      }
    });
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="p-4">
        <MobileHeader
          title="Save Route"
          backHref={`/home/cities/${cityId}/routes/create/preview`}
          variant="simple"
        />
      </div>

      <div className="flex-1 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="uniqueId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a unique ID (e.g., ROUTE1234)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be used as an identifier for your route.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="routeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Give your route a name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="routeDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your route"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-[#134C37] py-3 text-lg font-medium text-white"
                disabled={isAddPending}
              >
                {isAddPending ? 'Saving...' : 'Save Route'}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="p-4">
        <p className="text-center text-sm text-gray-500">
          Your route includes {routeStops.length} stops.
        </p>
      </div>
    </div>
  );
}
