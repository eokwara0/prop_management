"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export function useClientId(){
  const {data } = useSession()
  if(!data){
    throw new Error("session does not exist")
  }
  return data.user?.id;
}

export function useFetchWithCred() {
  const { data } = useSession();
  if (!data) {
    throw new Error("this user is not logged on.");
  }
  return  ( url: string, options: RequestInit ) => {
    try {
       return fetchWithCred(url, data, options)
    } catch (error) {
      throw new Error((error as Error).message)
    }
  };
}
/**
 * Fetch wrapper that attaches Basic Auth credentials
 */
export async function fetchWithCred(
  url: string,
  session: Session,
  options: RequestInit = {}
) {
  if (!session || !session.user) {
    throw new Error("User is not authenticated");
  }
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
