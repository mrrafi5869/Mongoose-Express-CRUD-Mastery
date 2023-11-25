import { UserModel } from '../student.model';
import { IUser } from './user.interface';

const createUserIntoDb = async function (user: IUser) {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDb = async function () {
  const result = await UserModel.find();
  return result;
};

const getSpecificUsersFromDb = async (id: string) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const updateUserInDb = async (id: string, path: string, value: any) => {
  const result = await UserModel.findOneAndUpdate({userId: id}, {$set: {[path]: value}}, {new: true});
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSpecificUsersFromDb,
  updateUserInDb
};
