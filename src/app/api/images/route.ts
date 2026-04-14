import { NextResponse } from "next/server";
import { supabase, BUCKET, getPublicUrl } from "@/lib/supabase";

async function listAllFiles(prefix: string = ""): Promise<Record<string, string>> {
  const { data, error } = await supabase.storage.from(BUCKET).list(prefix, {
    limit: 200,
  });

  if (error || !data) return {};

  const result: Record<string, string> = {};

  for (const item of data) {
    const fullPath = prefix ? `${prefix}/${item.name}` : item.name;

    if (item.id) {
      // It's a file
      result[fullPath] = getPublicUrl(fullPath);
    } else {
      // It's a folder — recurse
      const subFiles = await listAllFiles(fullPath);
      Object.assign(result, subFiles);
    }
  }

  return result;
}

export async function GET() {
  try {
    const images = await listAllFiles("images");
    return NextResponse.json(images);
  } catch {
    return NextResponse.json({});
  }
}
