import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  const { blobs } = await list();

  // Map blob paths to their URLs
  const images: Record<string, string> = {};
  for (const blob of blobs) {
    images[blob.pathname] = blob.url;
  }

  return NextResponse.json(images);
}
