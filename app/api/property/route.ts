import { Property } from "@/util/models/property.model";
import PropertyService from "@/util/services/property.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const [username, password] = GetBasicAuthData(req);
    const properties = await PropertyService.getAllProperties();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 500, message: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = (await req.json()) as Partial<Property>;
  const request = await PropertyService.createProperty(data);
  return NextResponse.json(request);
}
