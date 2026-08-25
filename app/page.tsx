import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { SaveTheDate } from "@/components/SaveTheDate";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <SaveTheDate />
    </main>
  );
}
