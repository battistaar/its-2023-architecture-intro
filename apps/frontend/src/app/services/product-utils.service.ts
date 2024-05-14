import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductUtilsService {

  getPriceWithoutVat(product: Product) {
    return product.netPrice * (1 - product.discount);
  }

  getFullPrice(product: Product, vat = 0) {
    return product.netPrice * (1 + vat);
  }

  getPrice(product: Product, vat = 0) {
    return product.netPrice * (1 + vat) * (1 - product.discount);
  }

  getDiscountAmount(product: Product, vat = 0) {
    return this.getFullPrice(product, vat) * product.discount;
  }

  getVatAmount(product: Product, vat = 0) {
    return this.getPriceWithoutVat(product) * vat;
  }
}
