import { cachedApiCall, CACHE_TAGS, CACHE_TTL } from "@/lib/cache";
import axios from "axios";

export async function getRepoStars(): Promise<number> {
  return cachedApiCall<number>(
    "github-stars",
    async () => {
      const res = await axios.get(
        "https://api.github.com/repos/3bdulrahmanOthman/Crud-Operations-Dashboard"
      );
      return res.data?.stargazers_count ?? 999;
    },
    [CACHE_TAGS.GITHUB],
    CACHE_TTL.DAILY 
  );
}
