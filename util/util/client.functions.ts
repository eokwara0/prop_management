import { auth } from "../auth";
/**
 * Checks if the current user is authenticated.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user is authenticated, false otherwise.
 */
export async function isValidUser() {
  const authdata = await auth();
  if (!authdata) {
    return false;
  }
  return authdata?.user !== undefined;
}
