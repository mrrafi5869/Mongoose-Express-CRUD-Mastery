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

const getSpecificUsersFromDb = async function (id : string) {
  const result = await UserModel.findOne({ id });
  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSpecificUsersFromDb
};
