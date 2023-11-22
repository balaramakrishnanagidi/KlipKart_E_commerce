import { Component } from '@angular/core';
import { ProductsComponent } from '../../parts/products/products.component';
import { BannersComponent } from '../../parts/banners/banners.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    standalone: true,
    imports: [BannersComponent, ProductsComponent]
})
export class DashboardComponent{

}
