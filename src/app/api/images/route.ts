import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const REPO_OWNER = "dosedegrowth-design";
const REPO_NAME = "bless-concept";
const BRANCH = "main";

async function listFiles(dirPath: string): Promise<Record<string, string>> {
  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${dirPath}?ref=${BRANCH}`;
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    next: { revalidate: 30 },
  });

  if (!res.ok) return {};

  const items = await res.json();
  const files: Record<string, string> = {};

  for (const item of items) {
    if (item.type === "file") {
      // Map: "images/hero/hero-bg.webp" -> download_url
      const key = item.path.replace("public/", "");
      files[key] = item.download_url;
    } else if (item.type === "dir") {
      const subFiles = await listFiles(item.path);
      Object.assign(files, subFiles);
    }
  }

  return files;
}

export async function GET() {
  if (!GITHUB_TOKEN) {
    return NextResponse.json({});
  }

  try {
    const images = await listFiles("public/images");
    return NextResponse.json(images);
  } catch {
    return NextResponse.json({});
  }
}
