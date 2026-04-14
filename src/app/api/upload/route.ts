import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const path = formData.get("path") as string;

  if (!file || !path) {
    return NextResponse.json({ error: "File and path are required" }, { status: 400 });
  }

  // Remove "public/" prefix — blob stores with the clean path
  const blobPath = path.replace("public/", "");

  const blob = await put(blobPath, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return NextResponse.json({ url: blob.url, path: blobPath });
}
