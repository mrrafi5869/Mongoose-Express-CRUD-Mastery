import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import {
  IAddress,
  IFullName,
  IUser,
  IUserMethods,
  UserModel
} from './user/user.interface';
import config from '../config';

const fullNameSchema = new Schema<IFullName>({
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
  },
});

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  userId: {
    type: Number,
    unique: true,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Student Password is required'],
    max: [20, 'Password can not be more than 20 characters'],
    trim: true,
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    enum: {
      values: ['true', 'false'],
    },
    required: true,
  },
  hobbies: {
    type: [String],
    default: [],
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function(next){
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
  next();
});

userSchema.post('save', async function(doc, next){
  doc.password = "";
  next();
})



userSchema.methods.isUserExist = async function (userId:number) {
  const existingUser = await User.findOne({userId})
  return existingUser;
}

export const User = model<IUser, UserModel>('User', userSchema);
