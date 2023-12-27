"use server";

import { groq } from "next-sanity";

import { getCachedClient } from "@/lib/getClient";

export const getPosts = async (
  search: string | undefined,
  tag: string | undefined,
  preview:
    | {
        token: string | undefined;
      }
    | undefined,
  pagination: { page: number; limit: number }
) => {
  const postsQuery = search
    ? groq`*[_type == "post" && (title match "${search}" || description match "${search}" || body match "${search}" || count((tags[]->title)[@ in ["${tag}"]]) > 0)]{
        ...,categories[]->,
      } | order(_createdAt desc)`
    : tag
    ? groq`*[_type == "post" && count((tags[]->slug.current)[@ in ["${tag}"]]) > 0]{
      ...,categories[]->,
    } | order(_createdAt desc)`
    : groq`*[_type == "post"]{
      ...,categories[]->,
    } | order(_createdAt desc) [${(pagination.page - 1) * pagination.limit}...${
        pagination.page * pagination.limit
      }]`;

  const posts = await getCachedClient(preview)(postsQuery);

  return posts;
};
