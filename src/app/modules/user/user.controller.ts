import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.zod.validation';
import { User } from '../student.model';

// const createUser = async (req: Request, res: Response) => {
//   try {
//     const { user: userData } = req.body;
//     const validatedData = userValidationSchema.parse(userData)
//     const result = await userServices.createUserIntoDb(validatedData);

//     //send response
//     res.status(201).json({
//       success: true,
//       message: 'User created successfully',
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(400).json({
//       success: false,
//       message: err.message || 'Something went wrong',
//       err,
//     });
//   }
// };

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const validatedData = userValidationSchema.parse(userData);
    const result = await userServices.createUserIntoDb(validatedData);
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDb();
    const specificDatas = result.map((user: any) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));
    //send response
    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully',
      data: specificDatas,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userServices.getSpecificUsersFromDb(id);
    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
      data: {
        userId: result.userId,
        username: result.username,
        fullName: result.fullName,
        age: result.age.toString(),
        email: result.email,
        isActive: result.isActive.toString(),
        hobbies: result.hobbies,
        address: result.address,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
    console.log(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const id = req.params.id;
    const result = await userServices.updateUserInDb(id, userData);
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userServices.deleteUserFromDb(id);
    res.status(200).json({
      success: true,
      message: 'User is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
    console.log(err);
  }
};

// add orders
export const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;  // Use req.params.id
    const productData = req.body;

    // Add the product to the user's order
    await User.addProductToOrder(id, productData);

    // Send the response
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};


//Retrieve all orders for a specific user:
// Controller to handle retrieving all orders for a specific user
export const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Retrieve all orders for the user
    const user = await User.findOne({ id });

    if (!user) {
      throw new Error('User not found');
    }

    // Send the response with the list of orders
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: user.orders || [],
      },
    });
  } catch (error: any) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

//Calculate Total Price of Orders for a Specific User:
// Controller to handle calculating the total price of orders for a specific user
export const calculateTotalPriceForUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id;

    // Retrieve the user
    const user = await User.findOne({ id });

    if (!user) {
      throw new Error('User not found');
    }

    // Calculate the total price
    const totalPrice = user.orders
      ? user.orders.reduce(
          (total, order) => total + order.price * order.quantity,
          0,
        )
      : 0;

    // Send the response with the total price
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error: any) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
