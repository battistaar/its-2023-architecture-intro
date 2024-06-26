import { Router } from 'express';
import cartItemRouter from './cart-item/cart-item.router';
import productRouter from './product/product.router';
import authRouer from './auth/auth.router';
import userRouter from './user/user.router';

const router = Router();

router.use('/cart-items', cartItemRouter);
router.use('/products', productRouter);
router.use('/users', userRouter);

router.use(authRouer);

export default router;