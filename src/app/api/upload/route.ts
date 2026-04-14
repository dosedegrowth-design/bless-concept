import { NextResponse } from "next/server";
import { supabase, BUCKET, getPublicUrl } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const path = formData.get("path") as string;

  if (!file || !path) {
    return NextResponse.json({ error: "File and path required" }, { status: 400 });
  }

  // Clean path: "public/images/hero/hero-bg.webp" -> "images/hero/hero-bg.webp"
  const storagePath = path.replace("public/", "");

  const buffer = await file.arrayBuffer();

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const url = getPublicUrl(storagePath);
  return NextResponse.json({ url, path: storagePath, success: true });
}
