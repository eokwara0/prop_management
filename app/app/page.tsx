import { auth } from "@/util/auth";
import IUser from "@/util/interfaces/iuser";

export default async function Page() {
      const session = await auth();
    //console.log('session.user:', session?.user as IUser);
  return (
    <>
      <div>something going down</div>
    </>
  );
}
