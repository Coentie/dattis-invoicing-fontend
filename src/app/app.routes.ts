import { Routes } from '@angular/router';
import { InvoiceIndexComponent } from './pages/invoice/invoice-index/invoice-index.component';
import { InvoiceUpdateComponent } from './pages/invoice/invoice-update/invoice-update.component';

export const routes: Routes = [
    { path: "", component: InvoiceIndexComponent},
    { path: "invoices", component: InvoiceIndexComponent},
    { path: "invoices/:id", component: InvoiceUpdateComponent},
];
