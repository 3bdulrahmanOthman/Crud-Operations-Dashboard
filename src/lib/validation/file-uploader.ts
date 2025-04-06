// Update the FileType to match the actual file types we support
export type FileType = 'image' | 'document' | 'video' | 'audio' | 'any';

export interface ValidationOptions {
  maxSize?: number 
  maxFiles?: number
  acceptedFileTypes?: string[]
  minDimensions?: { width: number; height: number } 
  maxDimensions?: { width: number; height: number } 
  aspectRatio?: number 
}

export interface ValidationPreset {
  maxSize: number
  maxFiles: number
  acceptedFileTypes: string[]
  acceptedMimeTypes: Record<string, string[]>
  errorMessages: Record<string, string>
}

// Validation presets for common use cases
export const validationPresets: Record<FileType, ValidationPreset> = {
  image: {
    maxSize: 4,
    maxFiles: 10,
    acceptedFileTypes: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    acceptedMimeTypes: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    errorMessages: {
      fileType: "Only image files are allowed (JPG, PNG, GIF, WEBP)",
      fileSize: "Image exceeds the maximum file size",
      fileCount: "Maximum number of images exceeded",
    },
  },
  document: {
    maxSize: 10,
    maxFiles: 5,
    acceptedFileTypes: [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt"],
    acceptedMimeTypes: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
      "text/plain": [".txt"],
    },
    errorMessages: {
      fileType: "Only document files are allowed (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT)",
      fileSize: "Document exceeds the maximum file size",
      fileCount: "Maximum number of documents exceeded",
    },
  },
  video: {
    maxSize: 100,
    maxFiles: 3,
    acceptedFileTypes: [".mp4", ".mov", ".avi", ".webm"],
    acceptedMimeTypes: {
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "video/x-msvideo": [".avi"],
      "video/webm": [".webm"],
    },
    errorMessages: {
      fileType: "Only video files are allowed (MP4, MOV, AVI, WEBM)",
      fileSize: "Video exceeds the maximum file size",
      fileCount: "Maximum number of videos exceeded",
    },
  },
  audio: {
    maxSize: 20,
    maxFiles: 5,
    acceptedFileTypes: [".mp3", ".wav", ".ogg", ".m4a"],
    acceptedMimeTypes: {
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
      "audio/ogg": [".ogg"],
      "audio/mp4": [".m4a"],
    },
    errorMessages: {
      fileType: "Only audio files are allowed (MP3, WAV, OGG, M4A)",
      fileSize: "Audio exceeds the maximum file size",
      fileCount: "Maximum number of audio files exceeded",
    },
  },
  any: {
    maxSize: 50,
    maxFiles: 10,
    acceptedFileTypes: ["*"],
    acceptedMimeTypes: {},
    errorMessages: {
      fileType: "File type not allowed",
      fileSize: "File exceeds the maximum file size",
      fileCount: "Maximum number of files exceeded",
    },
  },
}

// Helper function to get accept object for react-dropzone
export function getAcceptFromPreset(preset: ValidationPreset): Record<string, string[]> {
  return preset.acceptedMimeTypes
}

// Helper function to validate file dimensions (for images)
export async function validateImageDimensions(
  file: File,
  minDimensions?: { width: number; height: number },
  maxDimensions?: { width: number; height: number },
  aspectRatio?: number,
): Promise<{ valid: boolean; error?: string }> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve({ valid: true })
      return
    }

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const width = img.width
      const height = img.height

      if (minDimensions && (width < minDimensions.width || height < minDimensions.height)) {
        resolve({
          valid: false,
          error: `Image dimensions too small. Minimum: ${minDimensions.width}x${minDimensions.height}px`,
        })
        return
      }

      if (maxDimensions && (width > maxDimensions.width || height > maxDimensions.height)) {
        resolve({
          valid: false,
          error: `Image dimensions too large. Maximum: ${maxDimensions.width}x${maxDimensions.height}px`,
        })
        return
      }

      if (aspectRatio) {
        const currentRatio = width / height
        const tolerance = 0.05 // 5% tolerance

        if (Math.abs(currentRatio - aspectRatio) > tolerance) {
          resolve({
            valid: false,
            error: `Image aspect ratio should be ${aspectRatio.toFixed(2)}`,
          })
          return
        }
      }

      resolve({ valid: true })
    }

    img.onerror = () => {
      resolve({ valid: false, error: "Failed to load image for validation" })
    }

    img.src = URL.createObjectURL(file)
  })
}

// Helper function to format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
