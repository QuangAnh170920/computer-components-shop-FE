import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './pages/auth/guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                canActivate: [AuthGuard],
                path: '', component: AppLayoutComponent, title:'QAP Store',
                children: [
                    {path:'groups', loadChildren:()=> import('./pages/group-permission/group-permissions.module').then(m=>m.GrouppermissionsModule)},
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    {path: 'user', loadChildren: ()=> import('./pages/user/user.module').then(m => m.UserModule)},
                    // {path: '', loadChildren: ()=> import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    {path: 'product-management', loadChildren: ()=> import('./pages/product-management/product-management.module').then(m => m.ProductManagementModule) },
                    {path: 'product-specifications', loadChildren: ()=> import('./pages/product-specifications/product-specifications.module').then(m => m.ProductSpecificationsModule) },
                    {path: 'brand-management', loadChildren: ()=> import('./pages/brand-management/brand-mamagement.module').then(m => m.BrandMamagementModule) },
                    {path: 'categories-management', loadChildren: ()=> import('./pages/categories-management/categories-management.module').then(m => m.CategoriesManagementModule) },
                    {path: 'product-review', loadChildren: ()=> import('./pages/product-review/product-reivew.module').then(m => m.ProductReviewModule) },
                    {path: 'receiving-inventory', loadChildren: ()=> import('./pages/receiving-inventory/receiving-inventory.module').then(m => m.ReceivingInventoryModule) },
                    {path: 'shipping-inventory', loadChildren: ()=> import('./pages/shipping-inventory/shipping-inventory.module').then(m => m.ShippingInventoryModule) },
                    {path: 'warehouse', loadChildren: ()=> import('./pages/warehouse/warehouse.module').then(m => m.WarehouseModule) },
                    {path: 'sales-order', loadChildren: ()=> import('./pages/sales-order/sales-order.module').then(m => m.SalesOrderModule) },
                    {path: 'promotion', loadChildren: ()=> import('./pages/promotion/promotion.module').then(m => m.PromotionModule) },
                ]
            },
            { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
            { path: 'password', loadChildren: () => import('./pages/password-change-reset/password-change-reset.module').then(m => m.PasswordChangeResetModule) },
            { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash:false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
