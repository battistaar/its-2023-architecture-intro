import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { pick } from "lodash";
import { ProductFilters } from "../../services/product.service";

@Injectable({ providedIn: 'root' })
export class ProductFiltersResolver implements Resolve<ProductFilters> {

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ProductFilters {
    return pick(route.queryParams, ['name', 'minPrice', 'maxPrice']);
  }
}
