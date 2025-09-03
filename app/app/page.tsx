import { Helix_ } from "@/util/components/loader/loader";

export default async function Page() {
  //console.log('session.user:', session?.user as IUser);
  return (
    <>
      <div className="  flex-col gap-2 bg-gradient-to-tr from-l_f_s to-l_f_f min-h-[95.8svh] flex justify-center items-center">
        <Helix_/>
      </div>
    </>
  );
}
