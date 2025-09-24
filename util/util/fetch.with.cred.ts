"use client";
import { useSession } from "next-auth/react";

/**
 * Fetch wrapper that attaches Basic Auth credentials
 */
export async function fetchWithCred(
  url: string,
  options: RequestInit = {}
) {
  const { data: session } = useSession();

  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }

  // Example: assuming you stored credentials in the session
  // e.g., session.user.email as username and session.user.token/password as secret
  const username = session.user.email;
  const password = session.user.id; // or session.user.password if you store it

  const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: basicAuth,
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }

  return response.json();
}
