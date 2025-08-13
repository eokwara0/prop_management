import { Model } from 'objection';
import User from './user';
import { AdapterAccount, AdapterAccountType } from 'next-auth/adapters';
import { AuthorizationDetails } from 'oauth4webapi';

class Account extends Model {
  static get tableName() {
    return 'account';
  }

  static get idColumn() {
    return ['provider', 'providerAccountId'];
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'type', 'provider', 'providerAccountId'],
      properties: {
        userId: { type: 'string' },
        type: { type: 'string' },
        provider: { type: 'string' },
        providerAccountId: { type: 'string' },
        refresh_token: { type: ['string', 'null'] },
        access_token: { type: ['string', 'null'] },
        expires_at: { type: ['integer', 'null'] },
        token_type: { type: ['string', 'null'] },
        scope: { type: ['string', 'null'] },
        id_token: { type: ['string', 'null'] },
        session_state: { type: ['string', 'null'] },
      },
    };
  }

  static get relationMappings() {
    const user = User;
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: user,
        join: {
          from: 'account.userId',
          to: 'user.id',
        },
      },
    };
  }
}

export default Account;
