import { RouterModule, Routes } from "@angular/router";
import { ProductReviewComponent } from "./components/product-review/product-review.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: ProductReviewComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ProductReviewRoutingModule { }