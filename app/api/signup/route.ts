import knex from "@/util/auth/database.init";
import { AuthService } from "@/util/services/auth.service";
import { NextRequest, NextResponse } from "next/server";

/**
 *
 * @returns A simple GET response for the signup API route.
 */
export async function POST(req: NextRequest) {
  AuthService.getInstance(knex);
  const data = await req.json();
  const { email, password, name , userType  } = data;
  try {
    if (data) {
      const response = await AuthService.register({
        email: email,
        password: password,
        name : name,
        userType : userType
      });
      return NextResponse.json(response, {status :  200 });
    }
  } catch (error) {
    return NextResponse.json(
      {
         data : {
          message : (error as Error).message,
          error : {
            status : 500 , 
            message : "Internal Server Error"
          }
         }
      },
      { status: 500 , statusText : (error as Error).message }
    );
  }
}
