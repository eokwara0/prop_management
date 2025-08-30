import { AdapterUser } from "@auth/core/adapters";
import { Model } from "objection";
import Role from "../models/auth/role";

class IUser  extends Model implements AdapterUser {
  id!: string;
  email!: string;
  emailVerified!: Date | null;
  name?: string | null | undefined;
  image?: string | null | undefined;
  roles?: Role[] | null | undefined;
}


export default IUser;