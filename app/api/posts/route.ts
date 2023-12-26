import { groq } from "next-sanity";
import { getCachedClient } from "@/lib/getClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get("limit") || 3;

  const postsQuery = groq`*[_type == "post"] | order(_createdAt desc) [${`0...${limit}`}] | {slug, title, "thumbnail": mainImage.asset->url}`;

  const posts = await getCachedClient()(postsQuery);

  return NextResponse.json(posts);
}
