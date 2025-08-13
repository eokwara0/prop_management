import { Model } from 'objection';
import  User from './user';
import { AdapterSession } from 'next-auth/adapters';

class Session extends Model implements AdapterSession {
  sessionToken!: string;
  userId!: string;
  expires!: Date;
  static get tableName() {
    return 'session';
  }

  static get idColumn() {
    return 'sessionToken';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sessionToken', 'userId', 'expires'],
      properties: {
        sessionToken: { type: 'string' },
        userId: { type: 'string' },
        expires: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'session.userId',
          to: 'user.id',
        },
      },
    };
  }
}
export default Session;
