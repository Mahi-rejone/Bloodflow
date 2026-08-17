import AboutSection from "@/components/home/Aboutsection";
import BloodFactsGrid from "@/components/home/bloodfacts";
import CallCenterBanner from "@/components/home/callcenterbanner";
import ActionBanner from "@/components/home/cards";
import HeroBanner from "@/components/home/heroBanner";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <ActionBanner />
      <BloodFactsGrid />
      <AboutSection />
      <CallCenterBanner
        phoneNumbers={["01812116611", "01909586909"]}
        hoursLines={[
          "Sunday to Thursday (8 AM to 12 AM)",
          "Saturday (12 PM to 8 PM), Friday — Closed",
        ]}
        readMoreHref="/contact"
      />
    </div>
  );
}
