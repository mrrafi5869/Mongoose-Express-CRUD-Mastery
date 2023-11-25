import { Schema, model } from 'mongoose';
import { IAddress, IFullName, IUser } from './user/user.interface';

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
    required: true
  },
  country: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema<IUser>({
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
      values: ["true", "false"]
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
});

export const UserModel = model<IUser>('User', userSchema);
