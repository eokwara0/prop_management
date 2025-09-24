import { Property } from "@/util/models/property.model";
import { Property as P } from "@/util/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const [username, password] = GetBasicAuthData(req);
    const properties = await Property.getAllProperties();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 500, message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Partial<P>;
  const request = await Property.createProperty(data);
  return NextResponse.json(request);
}
