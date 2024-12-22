import { Routes } from '@angular/router';
import { InvoiceIndexComponent } from './pages/invoice/invoice-index/invoice-index.component';

export const routes: Routes = [
    { path: "", component: InvoiceIndexComponent},
    { path: "invoices", component: InvoiceIndexComponent},
];
