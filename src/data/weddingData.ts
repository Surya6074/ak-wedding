export interface WeddingEvent {
  id: "engagement" | "wedding";
  title: string;
  subTitle?: string;
  dateFormatted: string;
  timeFormatted: string;
  themeColor: string;
  venueName: string;
  venueAddress: string;
  calendarData: {
    title: string;
    description: string;
    location: string;
    startTimeUTC: string;
    endTimeUTC: string;
    icsFileName: string;
  };
}

export const weddingData = {
  // Couple Information
  groom: {
    name: "Aravindh",
    parents: "Son of Manikandan & Selvamary",
    bio: "A gentle soul with a heart full of warmth, ready to embark on life's most precious journey.",
    monogram: "A",
  },
  bride: {
    name: "Karthiga",
    parents: "Daughter of Balamurugan & Chitra",
    bio: "Graceful and radiant, stepping forward into a lifetime of shared laughter and timeless love.",
    monogram: "K",
  },

  // Hero Copy
  hero: {
    tagline: "Two Hearts... One Journey...",
    subline: "With the blessings of our loved ones.",
    weddingDateHeadline: "November 14 & 15, 2026 • Madurai",
    monogramBadge: "A & K",
  },

  // Countdown Target
  targetCountdownISO: "2026-11-15T08:00:00+05:30", // 15 Nov 2026, 8:00 AM IST
  timezone: "Asia/Kolkata",

  // Events
  events: [
    {
      id: "engagement",
      title: "Engagement Ceremony",
      subTitle: "An evening of promises, rings & celebration",
      dateFormatted: "Saturday, 14th November 2026",
      timeFormatted: "7:00 PM onwards",
      themeColor: "champagne",
      venueName: "Aaryan Thirumana Mahal",
      venueAddress: "1/237, Alagar Kovil Main Road, Janki Nagar, Kathakinaru, Madurai",
      calendarData: {
        title: "Aravindh & Karthiga — Engagement Ceremony",
        description: "Join us in celebrating the Engagement Ceremony of Aravindh & Karthiga at Aaryan Thirumana Mahal, Madurai.",
        location: "Aaryan Thirumana Mahal, 1/237, Alagar Kovil Main Road, Janki Nagar, Kathakinaru, Madurai, Tamil Nadu 625104",
        startTimeUTC: "20261114T133000Z", // 7:00 PM IST = 13:30 UTC
        endTimeUTC: "20261114T163000Z",   // 10:00 PM IST = 16:30 UTC
        icsFileName: "aravindh-karthiga-engagement.ics",
      },
    },
    {
      id: "wedding",
      title: "Wedding Ceremony",
      subTitle: "The sacred vows & auspicious Muhurtham",
      dateFormatted: "Sunday, 15th November 2026",
      timeFormatted: "8:00 AM – 9:15 AM",
      themeColor: "rosewood",
      venueName: "Aaryan Thirumana Mahal",
      venueAddress: "1/237, Alagar Kovil Main Road, Janki Nagar, Kathakinaru, Madurai",
      calendarData: {
        title: "Aravindh & Karthiga — Wedding Ceremony (Muhurtham)",
        description: "Auspicious wedding ceremony (Muhurtham) of Aravindh & Karthiga at Aaryan Thirumana Mahal, Madurai.",
        location: "Aaryan Thirumana Mahal, 1/237, Alagar Kovil Main Road, Janki Nagar, Kathakinaru, Madurai, Tamil Nadu 625104",
        startTimeUTC: "20261115T023000Z", // 8:00 AM IST = 02:30 UTC
        endTimeUTC: "20261115T034500Z",   // 9:15 AM IST = 03:45 UTC
        icsFileName: "aravindh-karthiga-wedding.ics",
      },
    },
  ] as WeddingEvent[],

  // Venue & Maps
  venue: {
    name: "Aaryan Thirumana Mahal",
    address: "1/237, Alagar Kovil Main Road, Janki Nagar, Kathakinaru, Madurai, Tamil Nadu 625104",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aaryan+Thirumana+Mahal+Alagar+Kovil+Main+Road+Kathakinaru+Madurai",
    embedQuery: "Aaryan+Thirumana+Mahal+Alagar+Kovil+Main+Road+Kathakinaru+Madurai",
  },

  // Romantic Closing Poetry
  footer: {
    poemLines: [
      "Two souls, two dreams, one beautiful beginning.",
      "A thousand memories waiting to unfold.",
      "With love in our hearts and blessings around us,",
      "We begin forever, together.",
    ],
    closingSignature: "Aravindh & Karthiga",
    weddingDateTag: "November 14 – 15, 2026",
    madeWithLove: "Made with Love",
  },
};
