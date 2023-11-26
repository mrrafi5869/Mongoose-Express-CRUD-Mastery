import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/', userControllers.createUser);
router.get("/", userControllers.getAllUsers);
router.get("/:userId", userControllers.getSingleUser);
router.put("/:userId", userControllers.getSingleUser);
router.delete("/:userId", userControllers.deleteUser);

export const UserRoutes = router;
