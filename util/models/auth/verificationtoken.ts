import { Model } from 'objection';
import { VerificationToken } from "next-auth/adapters";

class VerificationToken_ extends Model implements VerificationToken {
  identifier!: string;
  expires!: Date;
  token!: string;
  static get tableName() {
    return 'verificationToken';
  }

  static get idColumn() {
    return ['identifier', 'token'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['identifier', 'token', 'expires'],
      properties: {
        identifier: { type: 'string' },
        token: { type: 'string' },
        expires: { type: 'string', format: 'date-time' },
      },
    };
  }
}

export default VerificationToken_;
