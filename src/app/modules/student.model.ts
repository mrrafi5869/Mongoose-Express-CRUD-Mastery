import { Schema } from 'mongoose';
import { IFullName, IUser } from './user/user.interface';

const fullNameSchema = new Schema<IFullName>({
  firstName: {
    type: String,
    trim: true,
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  lastName: {
    type: String,
    trim: true,
  },
});

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    unique: true,
    trim: true,
  },
  username: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Student Password is required'],
    max: [20, 'Password can not be more than 20 characters'],
    unique: true,
    trim: true,
  },
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  
});
