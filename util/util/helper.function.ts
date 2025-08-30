import bcrypt from 'bcrypt';

export  async function EncryptPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(process.env.PASS_SALT ? parseInt(process.env.PASS_SALT) : 10);
    //console.log("SALT: ", salt);
    const hash = bcrypt.hashSync(password, salt);
    //console.log("HASH: ", hash);
  return hash.toString();
}

export async function ValidatePassword({ password , hash} : { password : string , hash : string }){
  return await bcrypt.compare(password , hash);
}