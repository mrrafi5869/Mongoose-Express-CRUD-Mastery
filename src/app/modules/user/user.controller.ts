import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.zod.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const validatedData = userValidationSchema.parse(userData)
    const result = await userServices.createUserIntoDb(validatedData);

    //send response
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDb();
    //send response
    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully',
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSpecificUsersFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;  
    
    const result = await userServices.getSpecificUsersFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
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
  getSingleUser
};
