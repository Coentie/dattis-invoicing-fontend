import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { TableComponent } from '../../shared/table/table.component';
import { HttpClient } from '@angular/common/http';
import {Invoice} from '../../../models/invoice';
import { TableDataComponent } from "../../shared/table/table-data/table-data.component";
import { PayButtonComponent } from "../payment/pay-button/pay-button.component";
import { environment } from '../../../environments/environment.development';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CustomerDropdownComponent } from '../../customer/dropdown/dropdown.component';
import { TaxDropdownComponent } from "../../finance/tax/tax-dropdown/tax-dropdown.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-tabel',
  imports: [
    CardComponent,
    TableComponent,
    TableDataComponent,
    PayButtonComponent,
    ModalComponent,
    CustomerDropdownComponent,
    TaxDropdownComponent,
    FormsModule
],
  templateUrl: './invoice-tabel.component.html',
})
export class InvoiceTabelComponent implements OnInit {
  invoices = signal<Invoice[]>([]);

  newInvoiceName = signal<string|null>(null);
  newInvoiceCustomerId = signal<Number|null>(null);

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

  onCancelCreateClickHandler() {
    this.isCreatingInvoice.set(false);
  }

  onCreateInvoiceClickHandler() {
    const postSub = this.httpClient.post(environment.apiUrl + 'invoices', {
      name: this.newInvoiceName(),
      customer: this.newInvoiceCustomerId()
    }).subscribe({
      next: () => {


        postSub.unsubscribe();
      }
    })
  }

  /**
   * Handles the click event from the "new" button
   */
  onNewClickHandler() {
    this.isCreatingInvoice.set(true);
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
