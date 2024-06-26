import { Request, Response, NextFunction } from 'express';
import cartItemService from './cart-item.service';
import productService from '../product/product.service';
import { CartItem } from './cart-item.entity';
import { TypedRequest } from '../../utils/typed-request.interface';
import { NotFoundError } from '../../errors/not-found';
import { AddCartItemDTO, UpdateQuantityDTO } from './cart-item.dto';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const list = await cartItemService.find(req.user!.id!);
  res.json(list);
}

export const add = async (
  req: TypedRequest<AddCartItemDTO>,
  res: Response,
  next: NextFunction) => {
    
    try {
      
      const { productId, quantity } = req.body;
      
      const product = await productService.getById(productId);
      if (!product) {
        throw new NotFoundError();
      }
      
      const newItem: CartItem = {
        product: productId,
        quantity
      };
      const saved = await cartItemService.add(newItem, req.user!.id!);
      res.json(saved);
    } catch(err) {
      next(err);
    }
}
  
export const updateQuantity = async (
  req: TypedRequest<UpdateQuantityDTO>,
  res: Response,
  next: NextFunction) => {
    const id = req.params.id;
    
    try {
      const newQuantity = req.body.quantity;
      
      const updated = await cartItemService.update(id, {quantity: newQuantity}, req.user!.id!);
      res.json(updated);
    } catch(err: any) {
      next(err);
    }
}
    
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    await cartItemService.remove(id, req.user!.id!);
    res.status(204);
    res.send();
  } catch(err: any) {
    next(err);
  }
}