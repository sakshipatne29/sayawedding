export type AccentColor = "maroon" | "gold" | "emerald" | "navy";

export interface Ceremony {
  id: string;
  name: string;
  tagline: string;
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
  hashtag: string;
  saveTheDate: { headline: string; dateRange: string };
  countdownTarget: string; // ISO datetime
  ceremonies: Ceremony[];
  primaryVenue: { name: string; address: string; mapEmbedUrl: string };
}

const VENUE_NAME = "The Grand Kasturi Resort";
const VENUE_ADDRESS = "Katara, Bhopal, Madhya Pradesh";
const VENUE_QUERY = encodeURIComponent(`${VENUE_NAME}, ${VENUE_ADDRESS}`);

export const wedding: WeddingConfig = {
  couple: { bride: "Sakshi", groom: "Yash" },
  hashtag: "#SakshiWedsYash",
  saveTheDate: {
    headline: "We're Getting Married!",
    dateRange: "November 23–26, 2026",
  },
  // Varmala & Pheras (the wedding ceremony itself) is the day the countdown
  // builds to; the festivities proper start three days earlier with Mehendi.
  countdownTarget: "2026-11-26T10:00:00+05:30",
  primaryVenue: {
    name: VENUE_NAME,
    address: VENUE_ADDRESS,
    // No Google API key in use, so this is the no-key embeddable form
    // (https://www.google.com/maps?q=<query>&output=embed) rather than a
    // hand-fabricated `pb=` parameter string, which doesn't actually work.
    mapEmbedUrl: `https://www.google.com/maps?q=${VENUE_QUERY}&output=embed`,
  },
  ceremonies: [
    {
      id: "mehendi",
      name: "Mehendi",
      tagline: "A little henna, a lot of laughter, and a lifetime of love to celebrate",
      date: "2026-11-23",
      startTime: "11:00 AM",
      venueName: VENUE_NAME,
      venueAddress: VENUE_ADDRESS,
      mapUrl: `https://maps.google.com/?q=${VENUE_QUERY}`,
      attire: "Green & yellow, casual traditional",
      accentColor: "emerald",
    },
    {
      id: "haldi",
      name: "Haldi Utsav",
      tagline: "Let the haldi magic begin",
      date: "2026-11-25",
      startTime: "11:00 AM",
      venueName: VENUE_NAME,
      venueAddress: VENUE_ADDRESS,
      mapUrl: `https://maps.google.com/?q=${VENUE_QUERY}`,
      attire: "Yellow & mustard, traditional",
      accentColor: "gold",
    },
    {
      id: "sangeet",
      name: "Sangeet Night",
      tagline: "Every song tells a story, every dance makes a memory",
      date: "2026-11-25",
      startTime: "8:00 PM",
      venueName: VENUE_NAME,
      venueAddress: VENUE_ADDRESS,
      mapUrl: `https://maps.google.com/?q=${VENUE_QUERY}`,
      attire: "Festive, sparkly Indo-western",
      accentColor: "navy",
    },
    {
      id: "wedding",
      name: "Varmala & Pheras",
      tagline: "Two hearts, one promise, seven sacred steps",
      date: "2026-11-26",
      startTime: "10:00 AM",
      venueName: VENUE_NAME,
      venueAddress: VENUE_ADDRESS,
      mapUrl: `https://maps.google.com/?q=${VENUE_QUERY}`,
      attire: "Traditional formal, maroon & gold encouraged",
      accentColor: "maroon",
    },
    {
      id: "reception",
      name: "Wedding Reception",
      tagline: "A new chapter, a beautiful beginning",
      date: "2026-11-26",
      startTime: "8:00 PM",
      venueName: VENUE_NAME,
      venueAddress: VENUE_ADDRESS,
      mapUrl: `https://maps.google.com/?q=${VENUE_QUERY}`,
      attire: "Cocktail / Indo-western formal",
      accentColor: "navy",
    },
  ],
};
