"use client";

import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

type TextTile = {
  type: "text";
  heading: string;
  points: string[];
  href: string;
  dark?: boolean;
};

type ImageTile = {
  type: "image";
  src: string;
  alt: string;
};

type Tile = TextTile | ImageTile;

const TILES: Tile[] = [
  {
    type: "text",
    heading: "Why donate blood?",
    points: [
      "One donation can save up to three lives.",
      "You may need blood yourself one day — someone else's donation made that possible.",
      "Regular donors have a lower risk of heart disease and easier iron regulation.",
    ],
    href: "/blogs",
  },
  {
    type: "image",
    src: "/assets/facts-donation-arm.png",
    alt: "A donor giving blood at a donation drive",
  },
  {
    type: "text",
    heading: "Who can donate?",
    points: [
      "Healthy adults aged 18 to 60.",
      "Free of major physical or mental health conditions.",
      "At least 50 kg in body weight.",
      "At least 4 months since your last donation.",
    ],
    href: "/blogs",
  },
  {
    type: "image",
    src: "/assets/facts-heart-hands.png",
    alt: "Hands holding a red heart, symbolizing giving blood",
  },
  {
    type: "text",
    heading: "Common myths",
    points: [
      "Donating doesn't hurt — only a brief pinch from the needle.",
      "It doesn't weaken your health. In fact, it lowers heart disease risk and clears excess iron.",
      "Diabetes doesn't automatically disqualify you — eligibility depends on your checkup.",
    ],
    href: "/blogs",
    dark: true,
  },
  {
    type: "image",
    src: "/assets/facts-blood-bags.png",
    alt: "Labeled blood donation bags ready for transfusion",
  },
];

function TextCard({ tile }: { tile: TextTile }) {
  return (
    <div className="flex flex-col justify-between bg-app-white p-6 sm:p-7">
      <div>
        <h3 className="text-lg font-semibold text-app-text mb-3">
          {tile.heading}
        </h3>
        <ul className="space-y-2">
          {tile.points.map((point, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm leading-relaxed text-app-text-light"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-app-primary" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={tile.href}
        className={`mt-5 inline-flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 ${
          tile.dark ? "bg-app-dark" : "bg-app-primary"
        }`}
      >
        Read More <ArrowRightOutlined className="text-xs" />
      </Link>
    </div>
  );
}

function ImageCard({ tile }: { tile: ImageTile }) {
  return (
    <div className="relative h-50 w-full sm:h-80">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tile.src}
        alt={tile.alt}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default function BloodFactsGrid() {
  return (
    <section className="bg-app-bg-soft">
      <div className="w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-app-text sm:text-3xl">
            What you should know before donating
          </h2>
          <p className="mt-2 text-app-text-light">
            A few facts worth knowing before your first donation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-app-border bg-app-border sm:grid-cols-3">
          {TILES.map((tile, i) =>
            tile.type === "text" ? (
              <TextCard key={i} tile={tile} />
            ) : (
              <ImageCard key={i} tile={tile} />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
