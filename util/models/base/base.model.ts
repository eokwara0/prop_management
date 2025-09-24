import knex from "@/util/auth/database.init";
import { Model } from "objection";

class BaseModel extends Model{
    public knex = knex
}

export { BaseModel };