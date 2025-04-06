import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Define a type that extracts the endpoint keys from OurFileRouter
export type UploadEndpoint = keyof OurFileRouter;

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

// Custom hook for tracking upload performance
export function useUploadPerformance() {
  return {
    trackUpload: (file: File) => {
      const startTime = performance.now();

      return {
        onProgress: (progress: number) => {
          const currentTime = performance.now();
          const elapsedSeconds = (currentTime - startTime) / 1000;
          const bytesUploaded = file.size * (progress / 100);
          const uploadSpeed = bytesUploaded / elapsedSeconds; // bytes per second

          return {
            progress,
            elapsedSeconds,
            uploadSpeed,
            estimatedTimeRemaining: progress < 100 ? (elapsedSeconds / progress) * (100 - progress) : 0,
          };
        },
        onComplete: () => {
          const endTime = performance.now();
          const totalTime = (endTime - startTime) / 1000;

          return {
            totalTime,
            averageSpeed: file.size / totalTime,
          };
        },
      };
    },
  };
}
