import knex from "@/util/auth/database.init";
import { AuthService } from "@/util/services/auth.service";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @returns A simple GET response for the signup API route.
 */
export async function POST(req: NextRequest) {
  AuthService.getInstance(knex);
  const { data } = await req.json();
  const { email, password } = data;
  try {
    if (data) {
      const response = await AuthService.register({
        email: email,
        password: password,
      });
      console.log("response from data " , response);
      return NextResponse.json(response, {status :  200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
