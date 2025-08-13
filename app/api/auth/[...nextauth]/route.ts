import { handlers } from "@/util/auth/auth";

/**
 * Exports the GET and POST request handlers from the `handlers` object.
 * These handlers are used to process authentication-related API routes
 * for NextAuth in the application.
 *
 * @see handlers
 * @see https://next-auth.js.org/
 */
export const { GET, POST } = handlers;
