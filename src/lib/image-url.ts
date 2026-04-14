// Maps local image paths to Vercel Blob URLs
// Cached in memory for the session
let blobUrls: Record<string, string> | null = null;
let fetchPromise: Promise<Record<string, string>> | null = null;

export async function getBlobUrls(): Promise<Record<string, string>> {
  if (blobUrls) return blobUrls;

  if (!fetchPromise) {
    fetchPromise = fetch("/api/images")
      .then((r) => r.json())
      .then((data) => {
        blobUrls = data;
        return data;
      })
      .catch(() => {
        blobUrls = {};
        return {};
      });
  }

  return fetchPromise;
}

/**
 * Resolves an image path to either a Blob URL or the local path.
 * Use in client components.
 *
 * @param localPath e.g. "/images/hero/hero-bg.webp"
 * @param urls the blob urls map from getBlobUrls()
 * @returns the blob URL if exists, otherwise the local path
 */
export function resolveImageUrl(localPath: string, urls: Record<string, string>): string {
  // localPath is like "/images/hero/hero-bg.webp"
  // blob pathname is like "images/hero/hero-bg.webp" (no leading slash)
  const blobKey = localPath.startsWith("/") ? localPath.slice(1) : localPath;
  return urls[blobKey] || localPath;
}
