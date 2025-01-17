import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {Invoice} from '../../../models/invoice';
import { TableDataComponent } from "../../shared/table/table-data/table-data.component";
import { PayButtonComponent } from "../payment/pay-button/pay-button.component";
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../shared/table/table.component';
import { SelectData } from '../../../types/forms/types';
import { InvoiceService } from '../invoiceService';
@Component({
  selector: 'app-invoice-tabel',
  imports: [
    TableComponent,
    TableDataComponent,
    PayButtonComponent,
    FormsModule
],
  templateUrl: './invoice-tabel.component.html',
})
export class InvoiceTabelComponent {
  invoiceService = inject(InvoiceService);
  invoices = this.invoiceService.invoices;

  /**
   * Updates the invoices when an invoice is set to paid.
   * 
   * @param event
   */
  onPaidHandler(event: Invoice) {
    this.invoiceService.updateSingle(event);
  }


  get columns() {
    const invoices =  this.invoiceService.invoices();

    return invoices.length === 0 ? [] : [
      ...Object.keys(invoices[0]),
      'Acties'
    ]
  }

}
