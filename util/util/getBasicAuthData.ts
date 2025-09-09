import { NextRequest } from "next/server";


export function GetBasicAuthData(req: NextRequest) {

    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        throw new Error("Invalid auth header")
    }
    /// extract base64 credentials
    const base64Cred = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Cred, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");


    return [username , password];
}
