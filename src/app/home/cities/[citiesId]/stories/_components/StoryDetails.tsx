'use client';

import { Button } from '@/components/ui/button';
import { Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface StoryDetailsProps {
  title: string;
  category: string;
  description: any;
}

export default function StoryDetails({
  title,
  category,
  description,
  cityId,
  storyId
}: StoryDetailsProps) {
  // const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* <div className="flex items-center justify-between">
        <div>
          <Badge className="rounded-full bg-[#BD8C58] text-sm hover:bg-[#BD8C58]">
            {category}
          </Badge>
          <div className="mt-4 flex items-center justify-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Popover>
              <PopoverTrigger>
                <InfoIcon size={16} color="#1347c7" />
              </PopoverTrigger>
              <PopoverContent className="bg-main text-white">
                Info here
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div> */}

      {/* <div>
        <p className={`text-sm text-gray-600 ${!isExpanded && 'line-clamp-2'}`}>
          {description}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 text-sm font-bold text-main hover:underline"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      </div> */}

      <div className="px-2">
        <p
          className={`font-nunito text-sm text-black`}
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>

      {/* <Button
        variant="default"
        className="flex w-full items-center border border-main hover:bg-transparent bg-white py-2 font-poppins text-main"
        onClick={() => router.push(`/home/cities/${cityId}/map/${storyId}`)}
      >
        <Map size={20} /> Map View
      </Button> */}
    </div>
  );
}
