import { Options } from "@/types";
import { useMemo } from "react";

export function useUniqueOptions<T>(
    items: T[],
    option: (item: T) => Options | null
  ): Options[] {
    return useMemo(() => {
      const seen = new Set<string>();
      return items
        .map(option)
        .filter((opt): opt is Options => {
          if (opt !== null && !seen.has(opt.value)) {
            seen.add(opt.value);
            return true;
          }
          return false;
        });
    }, [items, option]);
  }