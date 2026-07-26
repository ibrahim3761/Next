"use server"

import { cookies } from "next/headers";

export const getNewsById = async (id: string, isPremium: boolean = false) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  const headers: HeadersInit = {};

  if (accessToken) {
    headers["Cookie"] = `accessToken=${accessToken}`;
  }

  // hit different endpoints based on isPremium
  const endpoint = isPremium
    ? `${process.env.BACKEND_API_URL}/api/premium/${id}`
    : `${process.env.BACKEND_API_URL}/api/posts/${id}`;

  const res = await fetch(endpoint, {
    headers,
    cache: "no-cache",
    next: {
      revalidate: 60 * 60 * 6,
      tags: ["post-details"],
    },
  });

  const result = await res.json();
  return result;
};