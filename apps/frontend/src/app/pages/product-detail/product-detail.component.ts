import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { Product } from '../../interfaces/product';
import { CartSourceService } from '../../services/cart-source.service';
import { ProductUtilsService } from '../../services/product-utils.service';
import { VatService } from '../../services/vat.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  quantityInput = new FormControl(1, {validators: [Validators.required, Validators.min(1)]});

  product$ = this.activatedRoute.data
                .pipe(
                  map(({product}) => product as Product)
                )

  price$ = combineLatest([
              this.product$,
              this.vatSrv.vat$
            ])
            .pipe(
              map(([product, vat]) => this.productUtil.getPrice(product, vat))
            )

  discount$ = combineLatest([
              this.product$,
              this.vatSrv.vat$
            ])
            .pipe(
              map(([product, vat]) => this.productUtil.getDiscountAmount(product, vat))
            )

  constructor(private activatedRoute: ActivatedRoute,
              private vatSrv: VatService,
              private productUtil: ProductUtilsService,
              private cartSrv: CartSourceService) {}

  add(product: Product) {
    if (this.quantityInput.valid) {
      this.cartSrv.add(product.id, this.quantityInput.value!);
    }
  }
}
