import { unstable_cache, revalidateTag } from 'next/cache';

export const CACHE_TAGS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  GITHUB: "github",
} as const;

export const CACHE_TTL = {
  INSTANT: 0,           // 🔁 no caching (real-time)
  SHORT: 60 * 5,        // 🕐 5 minutes
  MEDIUM: 60 * 15,      // 🕐 15 minutes
  LONG: 60 * 60,        // 🕐 1 hour
  XLONG: 60 * 60 * 6,   // 🕐 6 hours
  DAILY: 60 * 60 * 24,  // 🕐 24 hours
  WEEKLY: 60 * 60 * 24 * 7 // 📅 7 days
} as const;


export async function cachedApiCall<T>(
  key: string,
  callback: () => Promise<T>,
  tags: string[] = [],
  revalidate: number = CACHE_TTL.SHORT
): Promise<T> {
  const fetchData = async (): Promise<T> => {
    try {
      return await callback();
    } catch (error) {
      console.error(`❌ Cached API call failed for key: ${key}`, error);
      throw new Error(`Failed to fetch data for key: ${key}`);
    }
  };

  return unstable_cache(fetchData, [key], { tags, revalidate })();
}

export async function invalidateCacheTags(tags: string[]): Promise<void> {
  try {
    await Promise.all(tags.map(tag => revalidateTag(tag)));
  } catch (error) {
    console.error('❌ Cache invalidation error:', error);
  }
}
