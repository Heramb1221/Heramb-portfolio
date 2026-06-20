export interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

const LEETCODE_USERNAME = "Heramb1221";

const FALLBACK_DATA: LeetCodeData = {
  totalSolved: 80,
  easySolved: 56,
  mediumSolved: 22,
  hardSolved: 2,
  acceptanceRate: 51.9,
  ranking: 1841960,
};

export async function getLeetCodeData(): Promise<LeetCodeData> {
  try {
    const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return FALLBACK_DATA;
    }

    const data = await res.json();
    
    return {
      totalSolved: Number(data.totalSolved ?? FALLBACK_DATA.totalSolved),
      easySolved: Number(data.easySolved ?? FALLBACK_DATA.easySolved),
      mediumSolved: Number(data.mediumSolved ?? FALLBACK_DATA.mediumSolved),
      hardSolved: Number(data.hardSolved ?? FALLBACK_DATA.hardSolved),
      acceptanceRate: Number(data.acceptanceRate ?? FALLBACK_DATA.acceptanceRate),
      ranking: Number(data.ranking ?? FALLBACK_DATA.ranking),
    };
  } catch (error) {
    console.warn("[leetcode] API fetch failed, using fallback:", error);
    return FALLBACK_DATA;
  }
}
