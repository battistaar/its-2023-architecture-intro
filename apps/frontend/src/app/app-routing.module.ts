import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ProductFiltersResolver } from "./pages/products/product-filters.resolver";
import { ProductsResolver } from "./pages/products/products.resolver";
import { ProductsContainerComponent } from "./pages/products-container/products-container.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { ProductResolver } from "./pages/product-detail/product.resolver";
import { LoginComponent } from "./pages/login/login.component";
import { authGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'products',
    component: ProductsContainerComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    children: [
      {
        path: '',
        component: ProductsComponent,
        resolve: {
          filters: ProductFiltersResolver,
          products: ProductsResolver
        },
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: {
          product: ProductResolver
        }
      }
    ]
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
