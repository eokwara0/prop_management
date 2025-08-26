import z, { email } from "zod";

export interface SignupData {
  name: string;
  email: string;
  password: string;
  surname: string;
  cellphone: string;
  gender: string;
  address: string;
  DOB: Date;
}

export const enum SignupStatus {
  SUCCESS = "success",
  ERROR = "error",
  INITIAL = "initial",
  LOADING = "loading",
}

export const Zsignup = z.object({
  name : z.string().length(100),
  email : z.email(),
  password: z.string().regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/),
  userType : z.string()
});
export const ZsignupData = z.object({
  name: z.string().length(100),
  surname: z.string().length(100),
  email: z.email(),
  password: z.string().regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/),
  cellphone: z.string(),
  gender: z.string(),
  address: z.string(),
  dob: z.iso.datetime(),
});