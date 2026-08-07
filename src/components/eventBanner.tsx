"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useGetAllEventsQuery } from "@/redux/feature/event/eventApi";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";

const AUTOPLAY_INTERVAL_MS = 3500;
const RESUME_AFTER_INTERACTION_MS = 5000;

function formatEventDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function EventBanner() {
  const { data, isLoading } = useGetAllEventsQuery(undefined);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const upcomingEvents = useMemo(() => {
    const all = data?.data ?? [];
    const now = Date.now();
    return all
      .filter((e: any) => new Date(e.eventDate).getTime() > now)
      .sort(
        (a: any, b: any) =>
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
      );
  }, [data]);
  
  useEffect(() => {
    if (autoplayPaused || upcomingEvents.length <= 1) return;

    const el = scrollerRef.current;
    if (!el) return;

    const id = setInterval(() => {
      const cardWidth = el.firstElementChild
        ? (el.firstElementChild as HTMLElement).offsetWidth + 16 // + gap
        : 300;

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;

      el.scrollTo({
        left: atEnd ? 0 : el.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(id);
  }, [autoplayPaused, upcomingEvents.length]);

  const handleUserInteraction = () => {
    setAutoplayPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setAutoplayPaused(false);
    }, RESUME_AFTER_INTERACTION_MS);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  if (isLoading || upcomingEvents.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-app-text mb-3">
        Upcoming Events
      </h2>

      <div
        ref={scrollerRef}
        onPointerDown={handleUserInteraction}
        onWheel={handleUserInteraction}
        onTouchStart={handleUserInteraction}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar"
      >
        {upcomingEvents.map((event: any) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="relative shrink-0 w-[280px] sm:w-[320px] h-40 rounded-2xl overflow-hidden border border-app-border snap-start"
          >
            {event.coverImage ? (
              <img
                src={event.coverImage}
                alt={event.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-app-dark" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-white font-semibold text-sm line-clamp-1">
                {event.title}
              </p>
              <div className="mt-1.5 flex items-center gap-3 text-[11px] text-white/80">
                <span className="flex items-center gap-1">
                  <CalendarOutlined /> {formatEventDate(event.eventDate)}
                </span>
                <span className="flex items-center gap-1 truncate">
                  <EnvironmentOutlined /> {event.location}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}