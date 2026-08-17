"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useGetLatestFiveQuery } from "@/redux/feature/blood/bloodRequestApi";

const popularBlogs = [
  {
    id: 1,
    title: "JavaScript Tutorial",
    badge: "Coding",
    image:
      "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 4300,
  },
  {
    id: 2,
    title: "Tech Trends 2025",
    badge: "Tech",
    image:
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 3200,
  },
  {
    id: 3,
    title: "The Future of AI",
    badge: "AI",
    image:
      "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2400,
  },
  {
    id: 4,
    title: "React Hooks Explained",
    badge: "Coding",
    image:
      "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1500,
  },
  {
    id: 5,
    title: "Image Generation with AI",
    badge: "AI",
    image:
      "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1200,
  },
];

const CardList = ({ title }: { title: string }) => {
  const { data, isLoading } = useGetLatestFiveQuery(undefined);
  if (isLoading) {
    return;
  }
  const latestContributions = data?.data?.map(
    (d: {
      id: string;
      donationDate: string;
      donor: {
        fullName: string;
        profile: { bloodGroup?: string; img?: string };
      };
    }) => ({
      id: d.id,
      title: d?.donor?.fullName,
      badge: d?.donor?.profile?.bloodGroup,
      image: d?.donor?.profile?.img,
    }),
  );

  const list = title === "Popular Blogs" ? popularBlogs : latestContributions;
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        list?.map((item: any) => (
          <Card
            key={item.id}
            className="flex-row items-center justify-between gap-4 p-4"
          >
            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <Badge variant="secondary">{item.badge}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;
