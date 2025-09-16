import { Property } from "@/util/models/property.model";
import PropertyService from "@/util/services/property.service";
import { GetBasicAuthData } from "@/util/util/getBasicAuthData";
import { NextRequest } from "next/server";
import { partialRecord } from "zod";

export async function GET(req: NextRequest) {
  try {
    // const [username, password] = GetBasicAuthData(req);
    const properties = await PropertyService.getAllProperties("")
    return properties;
    
  } catch (error) {}
}


export async function POST(req: NextRequest){
  const data = await req.json() as Partial<Property>;
  const request = await PropertyService.createProperty( data );
  return request;
}
