import { User } from '../student.model';
import { IUser } from './user.interface';

const createUserIntoDb = async function (userData: IUser) {
  // const result = await User.create(user);
  const user = new User(userData) 
  if(await user.isUserExist(userData.userId)){
    throw new Error('User already exist')
  }
  const result = await user.save();
  return result;
};

const getAllUsersFromDb = async function () {
  const result = await User.find();
  if (result.length === 0) {
    throw new Error('No users found');
  }
  return result;
};

const getSpecificUsersFromDb = async (userId: number) => {
  const result = await User.findOne({ userId });
  if(result === null){
    throw new Error('not user found')
  }
  return result;
};

const updateUserInDb = async (id: string, path: string, value: any) => {
  const result = await User.findOneAndUpdate(
    { userId: id },
    { $set: { [path]: value } },
    { new: true },
  );
  return result;
};

const deleteUserFromDb = async (id: string) => {
  const result = await User.deleteOne({ userId: id }, { isDelete: true });
  if (result.deletedCount === 0) {
    throw new Error('No user found for deletion');
  }
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSpecificUsersFromDb,
  updateUserInDb,
  deleteUserFromDb,
};
