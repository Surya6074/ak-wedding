export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: "Couple" | "Moments" | "Celebration" | "Ceremony";
  aspectRatio: "portrait" | "landscape" | "square" | "tall";
  heightClass: string;
  gradient: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/images/gallery/photo-01.jpg",
    alt: "Wedding couple editorial portrait",
    title: "Eternal Radiance",
    caption: "The first shared glance in festive finery",
    category: "Couple",
    aspectRatio: "tall",
    heightClass: "h-[420px]",
    gradient: "from-[#F8EBEB] via-[#F5E9D3] to-[#EBDADF]",
  },
  {
    id: 2,
    src: "/images/gallery/photo-02.jpg",
    alt: "Romantic wedding moment in sunlight",
    title: "Gentle Whispers",
    caption: "Laughter echoed under the autumn golden light",
    category: "Moments",
    aspectRatio: "square",
    heightClass: "h-[300px]",
    gradient: "from-[#FBF5EA] via-[#EDE4DA] to-[#F5E9D3]",
  },
  {
    id: 3,
    src: "/images/gallery/photo-03.jpg",
    alt: "Wedding celebration with flower petals",
    title: "Petals & Joy",
    caption: "Celebrations showered in sacred jasmine and marigolds",
    category: "Celebration",
    aspectRatio: "landscape",
    heightClass: "h-[280px]",
    gradient: "from-[#F4EFEA] via-[#FBF5EA] to-[#E3D8CA]",
  },
  {
    id: 4,
    src: "/images/gallery/photo-04.jpg",
    alt: "Ceremony rituals and golden rings",
    title: "Vows of Eternity",
    caption: "Two rings exchanged in the presence of beloved family",
    category: "Ceremony",
    aspectRatio: "tall",
    heightClass: "h-[440px]",
    gradient: "from-[#EBDADF] via-[#FAF7F2] to-[#DFBA73]",
  },
  {
    id: 5,
    src: "/images/gallery/photo-05.jpg",
    alt: "Couple walking together hand in hand",
    title: "Together Forward",
    caption: "Stepping into tomorrow with hands clasped tight",
    category: "Couple",
    aspectRatio: "portrait",
    heightClass: "h-[360px]",
    gradient: "from-[#F5E9D3] via-[#FAF7F2] to-[#EFE8DE]",
  },
  {
    id: 6,
    src: "/images/gallery/photo-06.jpg",
    alt: "Candid smiles and shared laughter",
    title: "Golden Hour Glow",
    caption: "Timeless moments that words can barely capture",
    category: "Moments",
    aspectRatio: "square",
    heightClass: "h-[310px]",
    gradient: "from-[#F8F5F0] via-[#EBD0D4] to-[#FBF5EA]",
  },
  {
    id: 7,
    src: "/images/gallery/photo-07.jpg",
    alt: "Traditional silk attire & temple jewelry",
    title: "Heritage & Grace",
    caption: "The regal elegance of pure Kanjeevaram silk & antique gold",
    category: "Ceremony",
    aspectRatio: "tall",
    heightClass: "h-[400px]",
    gradient: "from-[#FAF6EF] via-[#CCA977]/30 to-[#8B3A4A]/20",
  },
  {
    id: 8,
    src: "/images/gallery/photo-08.jpg",
    alt: "Family celebration and blessings",
    title: "Sacred Blessings",
    caption: "Surrounded by generations of unconditional love",
    category: "Celebration",
    aspectRatio: "portrait",
    heightClass: "h-[340px]",
    gradient: "from-[#E3D8CA] via-[#FAF7F2] to-[#D5C7B5]",
  },
];

/**
 * Fisher-Yates (Knuth) Shuffle Algorithm
 * Ensures an unbiased, mathematically uniform permutation of gallery items.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
