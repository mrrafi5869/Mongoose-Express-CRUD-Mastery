import express from 'express';
import { addProductToOrder, calculateTotalPriceForUser, getAllOrdersForUser, userControllers } from './user.controller';

const router = express.Router();

router.post('/', userControllers.createUser);
router.get("/", userControllers.getAllUsers);
router.get("/:id", userControllers.getSingleUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);
//orders routes
router.put('/api/users/:id/orders', addProductToOrder);
router.get('/api/users/:id/orders', getAllOrdersForUser);
router.get('/api/users/:id/orders/total-price', calculateTotalPriceForUser);


export const UserRoutes = router;
