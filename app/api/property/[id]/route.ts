import knex from "@/util/auth/database.init";
import { PropertySchema } from "@/util/models";
import User from "@/util/models/auth/user";
import { Property } from "@/util/models/property.model";
import { Property as PP } from "@/util/models";
import { NextRequest, NextResponse } from "next/server";

function withWrapper(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async function (req: NextRequest) {
    try {
      const authHeader = req.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Basic ")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      // Decode base64 credentials
      const base64Credentials = authHeader.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString(
        "utf-8"
      );
      const [username, password] = credentials.split(":");
      const ab = await knex("user")
        .where("id", password)
        .andWhere("email", username)
        .returning("*")
        .first();

      if (!ab) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      return await handler(req);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}

async function postHandler(req: NextRequest) {
    try {
        const body = await req.json();
        const result = (await Property.createProperty(body))?.toJSON() as PP;
        if (!result) {
            return NextResponse.json(
                { error: "Failed to create property" },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: `Property '${result.name}' created successfully`, property: result },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export const POST = withWrapper(postHandler);
