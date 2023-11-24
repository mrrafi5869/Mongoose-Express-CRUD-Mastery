import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/create-user', userControllers.createUser);
router.get("/", userControllers.getAllUsers);
router.get("/:userId", userControllers.getSingleUser);

export const UserRoutes = router;
