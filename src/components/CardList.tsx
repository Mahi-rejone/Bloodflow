"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useGetLatestFiveQuery } from "@/redux/feature/blood/bloodRequestApi";
import {
  BLOOD_GROUP_LABEL,
  BloodGroup,
  initials,
} from "@/app/(MainPage)/(withnav)/(Authorized)/donors/[id]/page";
import { useGetLatestFiveBlogQuery } from "@/redux/feature/blog/blogApi";

const CardList = ({ title }: { title: string }) => {
  const { data, isLoading } = useGetLatestFiveQuery(undefined);
  const { data: blog, isLoading: isBlogLoading } =
    useGetLatestFiveBlogQuery(undefined);
  if (isLoading || isBlogLoading) {
    return;
  }
  const popularBlogs = blog?.data?.map(
    (d: { author: { fullName: string }; id: string; title: string }) => ({
      id: d?.id,
      title: d?.title,
      badge: d?.author?.fullName,
    }),
  );
  const latestContributions = data?.data?.map(
    (d: {
      id: string;
      donationDate: string;
      donor: {
        fullName: string;
        profile: { bloodGroup?: string; img?: string };
      };
    }) => ({
      id: d?.id,
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
            <div className="w-12 h-12 bg-slate-100 rounded-[50%] font-bold flex justify-center items-center overflow-hidden">
              {initials(title === "Popular Blogs" ? item?.badge : item.title)}
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">
                {item?.title}
              </CardTitle>
              <Badge variant="secondary">
                {title === "Popular Blogs"
                  ? item?.badge
                  : BLOOD_GROUP_LABEL[item?.badge as BloodGroup]}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;
