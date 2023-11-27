import { User } from '../student.model';
import { IOrder, IUser } from './user.interface';

const createUserIntoDb = async function (userData: IUser) : Promise<IUser> {
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

const getSpecificUsersFromDb = async (_id: string) => {
  const result = await User.findOne({ _id });
  if(result === null){
    throw new Error('not user found')
  }
  return result;
};

const updateUserInDb = async (
  _id: string,
  userData: IUser,
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate(_id, userData, {
    new: true,
    runValidators: true,
  })
  
  return result
}



const deleteUserFromDb = async (_id: string) => {
  const result = await User.deleteOne({ _id }, { isDelete: true });
  if (result.deletedCount === 0) {
    throw new Error('No user found for deletion');
  }
  return result;
};

const addProductToOrder = async (_id: string, productData: IOrder): Promise<void> => {
  try {
    const user = await User.findOne({ _id });
    console.log(user);
    if (!user) {
      throw new Error('User not found');
    }
    // Check if the user has an 'orders' property, initialize if not
    if (!user.orders) {
      user.orders = [];
    }
    // Add the new product data to the 'orders' array
    user.orders.push(productData);
    await user.save();
  } catch (error: any) {
    throw new Error(`Failed to add product to order: ${error.message}`);
  }
};

export const userServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSpecificUsersFromDb,
  updateUserInDb,
  deleteUserFromDb,
  addProductToOrder
};
