import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.zod.validation';

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
    const userData = req.body
    const validatedData = userValidationSchema.parse(userData)
    const result = await userServices.createUserIntoDb(validatedData)
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}



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
    const userId = req.params.userId;
    const result = await userServices.getSpecificUsersFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
      data: {
        userId: result.userId, // Assuming userId is a number, convert to string if needed
    username: result.username,
    fullName: result.fullName,
    age: result.age.toString(), // Assuming age is a number, convert to string if needed
    email: result.email,
    isActive: result.isActive.toString(), // Assuming isActive is a boolean, convert to string if needed
    hobbies: result.hobbies,
    address: result.address,
      },
    });
    
  } catch (err : any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
    console.log(err);
  }
};

// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const userData = req.body;
//     const userId = req.params.userId;  
//     const result = await userServices.updateUserInDb(Number(userId), userData);
//     res.status(200).json({
//       success: true,
//       message: 'User is updated successfully',
//       data: result,
//     });
    
//   } catch (err : any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'Something went wrong',
//       error: err,
//     });
//     console.log(err);
//   }
// };


const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const userId = req.params.userId
    const result = await userServices.updateUserInDb(userId, userData)
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;  
    const result = await userServices.deleteUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User is deleted successfully',
      data: result,
    });
    
  } catch (err : any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
    console.log(err);
  }
};



export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
