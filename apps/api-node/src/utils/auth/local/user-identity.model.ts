import { Schema, model } from 'mongoose';
import { UserIdentity as iUserIdentity } from './user-identity.entity';

export const userIdentitySchema = new Schema<iUserIdentity>({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  provider: {type: String, default: 'local'},
  credentials: {type: {
    username: String,
    password: String
  }}
});

userIdentitySchema.pre('findOne', function(next) {
  this.populate('user');
  next();
});

export const UserIdentity = model<iUserIdentity>('UserIdentity', userIdentitySchema);