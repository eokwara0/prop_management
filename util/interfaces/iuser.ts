import { AdapterUser } from "@auth/core/adapters";
import { Model } from "objection";

class IUser  extends Model implements AdapterUser {
  id!: string;
  email!: string;
  emailVerified!: Date | null;
  name?: string | null | undefined;
  image?: string | null | undefined;
  roles?: Roles[] | null | undefined;
}


type Roles = {
   id : string;
   description : string;
   name : string;
};
export default IUser;