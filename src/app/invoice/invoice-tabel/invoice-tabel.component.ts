import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Invoice} from '../../../models/invoice';
import { TableDataComponent } from "../../shared/table/table-data/table-data.component";
import { PayButtonComponent } from "../payment/pay-button/pay-button.component";
import { environment } from '../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../shared/table/table.component';
import { Customer } from '../../../models/customer';
import { SelectData } from '../../../types/forms/types';

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
export class InvoiceTabelComponent implements OnInit {
  invoices = signal<Invoice[]>([]);

  newInvoiceName = signal<string|null>(null);
  newInvoiceCustomer = signal<SelectData|null>(null);

  isCreatingInvoice = signal<boolean>(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  /**
   * Updates the invoices when an invoice is set to paid.
   * 
   * @param event
   */
  onPaidHandler(event: Invoice) {
    this.invoices.update(curr => {
      return curr.map((i: Invoice) => {
        if(i.id === event.id) return event;
        return i;
      })
    })
  }


  get columns() {
    const invoices =  this.invoices();

    return invoices.length === 0 ? [] : [
      ...Object.keys(invoices[0]),
      'Acties'
    ]
  }

  ngOnInit() {
    const sub = this.httpClient.get<Invoice[]>(environment.apiUrl + 'invoices').subscribe({
      next: (res) => {
        this.invoices.set(res);
      }
    })

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    })
  }
}
