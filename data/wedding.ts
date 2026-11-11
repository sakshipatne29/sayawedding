export type AccentColor = "maroon" | "gold" | "emerald" | "navy";

export interface Ceremony {
  id: string;
  name: string;
  themeName?: string; // shown as the card title, with `name` as its sub-title
  titleColor?: string; // overrides the accent colour for the card title
  lightText?: boolean; // use light text, for dark card colours
  // Picture shown on the opposite side of the timeline from the card.
  image?: { src: string; alt: string; width: number; height: number };
  cardColor?: string; // card background; falls back to the default ivory/blush
  tagline: string;
  taglineFlowerColor?: string; // draws a small flower of this colour after the tagline
  date: string; // ISO date, e.g. "2026-12-04"
  startTime: string; // "10:00 AM"
  endTime?: string;
  venueName: string;
  venueAddress: string;
  mapUrl: string;
  attire: string;
  accentColor: AccentColor;
}

export interface WeddingConfig {
  couple: { bride: string; groom: string };
  families: { bride: string[]; groom: string[] }; // one entry per line
  story: { lines: string[]; closingLine: string };
  hashtag: string;
  invitation: { title: string; opening: string; lines: string[]; closing: string };
  saveTheDate: { headline: string; weddingDay: string; dateRange: string };
  countdownTarget: string; // ISO datetime
  countdown: { heading: string; subheading: string };
  closing: { signoff: string; line: string };
  music: { src: string }; // the music button only appears once this file exists
  ceremonies: Ceremony[];
  primaryVenue: {
    heading: string;
    name: string;
    address: string;
    directionsUrl: string;
    mapEmbedUrl: string;
  };
}

const VENUE_NAME = "The Grand Kasturi Resort";
const VENUE_ADDRESS =
  "Kasturi Square, Main Road, beside Sri. Chaitanya School, Katara, Bhopal, Madhya Pradesh 462043";
const VENUE_DIRECTIONS = "https://maps.app.goo.gl/gob8dY6zc2mkMYFH8";

export const wedding: WeddingConfig = {
  couple: { bride: "Sakshi", groom: "Yash" },
  story: {
    lines: [
      "It all began with a friendship in 2017, never knowing what life had planned for us. 🤍",
      "In 2021, somewhere between endless conversations and being each other’s best friend, we fell in love. ❤️",
      "And now, in 2026, we’re turning our beautiful love story into a forever promise. 💍",
    ],
    closingLine:
      "Who knew my best friend would become my husband? The best love stories begin with friendship, and ours is only just beginning. ♾️✨",
  },
  families: {
    bride: ["Daughter of", "Seema & Anil Patne", "from Betul, MP"],
    groom: ["Son of", "Anita & Mukesh Rai", "from Bhopal, MP"],
  },
  hashtag: "#SakshiWedsYash",
  invitation: {
    title: "A Celebration of Love",
    opening: "Our forever begins here.",
    lines: [
      "With hearts full of happiness,",
      "we invite you to join us as we celebrate",
      "love, family, traditions and the beginning",
      "of our beautiful journey together.",
    ],
    closing: "Let the celebrations begin. ✨",
  },
  saveTheDate: {
    headline: "We're Getting Married!",
    weddingDay: "Thursday, 26th November 2026",
    dateRange: "November 23–26, 2026",
  },
  // Varmala & Pheras (the wedding ceremony itself) is the day the countdown
  // builds to; the festivities proper start three days earlier with Mehendi.
  countdownTarget: "2026-11-26T10:00:00+05:30",
  countdown: {
    heading: "Countdown to Forever",
    subheading: "Every second brings us closer to our forever.",
  },
  music: { src: "/music.mp3" },
  closing: {
    signoff: "With love,",
    line: "We cannot wait to celebrate with you.",
  },
  primaryVenue: {
    heading: "Wedding Venue",
    name: VENUE_NAME,
    address: VENUE_ADDRESS,
    directionsUrl: VENUE_DIRECTIONS,
    // Copied from Google Maps → Share → Embed a map.
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14670.914793976866!2d77.48342331433454!3d23.180099966410086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4190672aa503%3A0x46fe954e0e94ffeb!2sTHE%20GRAND%20KASTURI%20RESORT!5e0!3m2!1sen!2sin!4v1794424380560!5m2!1sen!2sin",
  },
  ceremonies: [
    {
      id: "mehendi",
      name: "Mehendi",
      themeName: "Ink Of Love",
      cardColor: "#CFE8CF",
      image: {
        src: "/mehendi.jpg",
        alt: "Illustration of a bride having mehendi applied by her friends",
        width: 1400,
        height: 933,
      },
      tagline: "A little henna, a lot of laughter, and a lifetime of love to celebrate",
      date: "2026-11-23",
      startTime: "11:00 AM",
      venueName: "Betul",
      venueAddress: "Betul, Madhya Pradesh",
      mapUrl: "https://maps.google.com/?q=Betul%2C%20Madhya%20Pradesh",
      attire: "Green & yellow, casual traditional",
      accentColor: "emerald",
    },
    {
      id: "haldi",
      name: "Haldi Utsav",
      themeName: "Turmeric Tales",
      cardColor: "#FFD9B3",
      image: {
        src: "/haldi.jpg",
        alt: "Illustration of a haldi ceremony with family showering the couple in turmeric and flowers",
        width: 1400,
        height: 788,
      },
      tagline: "Let the haldi magic begin!",
      taglineFlowerColor: "#F28C28",
      date: "2026-11-25",
      startTime: "11:00 AM",
      venueName: VENUE_NAME,
      venueAddress: VENUE_ADDRESS,
      mapUrl: VENUE_DIRECTIONS,
      attire: "Yellow & mustard, traditional",
      accentColor: "gold",
    },
    {
      id: "sangeet",
      name: "Sangeet Night",
      themeName: "Beats & Bling",
      cardColor: "#CFE3F7",
      image: {
        src: "/sangeet.jpg",
        alt: "Illustration of a couple dancing under string lights at a sangeet night",
        width: 1400,
        height: 933,
      },
      tagline:
        "Every song tells a story, every dance makes a memory, let the celebrations take centre stage! ✨",
      date: "2026-11-25",
      startTime: "8 PM onwards",
      venueName: VENUE_NAME,
      venueAddress: VENUE_ADDRESS,
      mapUrl: VENUE_DIRECTIONS,
      attire: "Festive, sparkly Indo-western",
      accentColor: "navy",
    },
    {
      id: "wedding",
      name: "Varmala & Pheras",
      themeName: "Vows & Veils",
      titleColor: "#C2185B",
      cardColor: "#FAD1DE",
      image: {
        src: "/wedding.jpg",
        alt: "Illustration of a bride in red walking down a flower-lined aisle towards the groom at the mandap",
        width: 1400,
        height: 788,
      },
      tagline:
        "Two hearts. One promise. Seven sacred steps. A lifetime together. Come witness the beginning of forever. 🌸",
      date: "2026-11-26",
      startTime: "10 AM onwards",
      venueName: VENUE_NAME,
      venueAddress: VENUE_ADDRESS,
      mapUrl: VENUE_DIRECTIONS,
      attire: "Traditional formal, maroon & gold encouraged",
      accentColor: "maroon",
    },
    {
      id: "reception",
      name: "Wedding Reception",
      themeName: "Toast To Forever",
      titleColor: "#E1AD01",
      cardColor: "#52658F",
      lightText: true,
      image: {
        src: "/reception.jpg",
        alt: "Illustration of the couple standing hand in hand under a chandelier at a candlelit evening reception",
        width: 1400,
        height: 788,
      },
      tagline: "A new chapter. A beautiful beginning. And a lifetime of love to celebrate.",
      date: "2026-11-26",
      startTime: "8 PM onwards",
      venueName: VENUE_NAME,
      venueAddress: VENUE_ADDRESS,
      mapUrl: VENUE_DIRECTIONS,
      attire: "Cocktail / Indo-western formal",
      // Gold, not navy: the seal and timeline marker would vanish against the navy card.
      accentColor: "gold",
    },
  ],
};
