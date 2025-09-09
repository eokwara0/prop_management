import { GetBasicAuthData } from "@/util/util/getBasicAuthData";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  try {
    const [username, password] = GetBasicAuthData(req);
  } catch (error) {}
}
