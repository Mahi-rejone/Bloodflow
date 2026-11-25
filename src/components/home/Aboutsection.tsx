"use client";

const MOSAIC_PHOTOS = [
  {
    src: "/assets/about-2.jpeg",
    alt: "Volunteers at a BloodFlow donation drive",
  },
  { src: "/assets/about-7.jpeg", alt: "A donor smiling after giving blood" },
  {
    src: "/assets/about-4.jpeg",
    alt: "Group photo of donors at a campus drive",
  },
  { src: "/assets/about-5.jpeg", alt: "A nurse assisting a donor" },
  { src: "/assets/about-1.jpeg", alt: "Volunteers holding a BloodFlow banner" },
  {
    src: "/assets/about-3.jpeg",
    alt: "Donors registering at a community event",
  },
];

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-app-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-4 lg:px-8">
        {/* Left — heading + mission copy */}
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-app-primary">BloodFlow</span>{" "}
            <span className="text-app-text">— About Us</span>
          </h2>

          <p className="mt-6 text-[15px] leading-relaxed text-app-text-light">
            Built on the idea that{" "}
            <em>
              &quot;donating blood saves lives, and in turn, saves the donor
              too,&quot;
            </em>{" "}
            BloodFlow exists for one reason: to make it effortless for anyone in
            urgent need of blood to reach a willing donor directly, at any hour,
            without middlemen. Donors register once, and from that point on,
            they can be found and reached by anyone searching in their area.
          </p>

          <p className="mt-4 text-[15px] leading-relaxed text-app-text-light">
            Blood can&apos;t be manufactured — only people can give it to one
            another. Every year, people lose their lives simply because blood
            wasn&apos;t available when it mattered most, even though enough
            donors exist. We believe that gap closes the moment people
            understand how easy, safe, and life-saving donation really is. If
            you&apos;re willing to give, register as a donor today. Somewhere,
            someone in need is searching for exactly you.
          </p>
        </div>

        {/* Right — circular photo mosaic, bleeding off the edge on large screens */}
        <div className="flex justify-center lg:justify-end">
          <div
            className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-full lg:-mr-16 lg:max-w-[480px]"
            style={{ clipPath: "circle(50%)" }}
          >
            <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-1">
              {MOSAIC_PHOTOS.map((photo, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
