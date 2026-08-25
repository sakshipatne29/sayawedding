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

export const wedding: WeddingConfig = {
  couple: { bride: "Sakshi", groom: "Yash" },
  hashtag: "#SakshiWedsYash",
  saveTheDate: {
    headline: "We're Getting Married!",
    dateRange: "December 4–6, 2026",
  },
  countdownTarget: "2026-12-04T10:00:00+05:30",
  primaryVenue: {
    name: "The Grand Ivory Lawns",
    address: "14 Palm Grove Road, Alibaug, Maharashtra 402201",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.0!2d72.87!3d18.64!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM4JzI0LjAiTiA3MsKwNTInMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000",
  },
  ceremonies: [
    {
      id: "haldi",
      name: "Haldi Ceremony",
      tagline: "A morning of turmeric, laughter, and yellow everything",
      date: "2026-12-04",
      startTime: "10:00 AM",
      endTime: "1:00 PM",
      venueName: "The Grand Ivory Lawns — Garden Pavilion",
      venueAddress: "14 Palm Grove Road, Alibaug, Maharashtra 402201",
      mapUrl: "https://maps.google.com/?q=The+Grand+Ivory+Lawns+Alibaug",
      attire: "Yellow & mustard, traditional",
      accentColor: "gold",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      tagline: "Two families, one sacred fire",
      date: "2026-12-05",
      startTime: "7:00 PM",
      endTime: "11:00 PM",
      venueName: "The Grand Ivory Lawns — Main Mandap",
      venueAddress: "14 Palm Grove Road, Alibaug, Maharashtra 402201",
      mapUrl: "https://maps.google.com/?q=The+Grand+Ivory+Lawns+Alibaug",
      attire: "Traditional formal, maroon & gold encouraged",
      accentColor: "maroon",
    },
    {
      id: "reception",
      name: "Reception",
      tagline: "Dinner, dancing, and a toast to forever",
      date: "2026-12-06",
      startTime: "8:00 PM",
      venueName: "The Grand Ivory Lawns — Emerald Hall",
      venueAddress: "14 Palm Grove Road, Alibaug, Maharashtra 402201",
      mapUrl: "https://maps.google.com/?q=The+Grand+Ivory+Lawns+Alibaug",
      attire: "Cocktail / Indo-western formal",
      accentColor: "emerald",
    },
  ],
};
