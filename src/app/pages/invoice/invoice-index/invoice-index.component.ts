import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CardComponent } from '../../../shared/card/card.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { CustomerDropdownComponent } from '../../../customer/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { InvoiceTabelComponent } from "../../../invoice/invoice-tabel/invoice-tabel.component";

@Component({
  selector: 'app-invoice-index',
  imports: [
    CardComponent,
    ModalComponent,
    CustomerDropdownComponent,
    FormsModule,
    InvoiceTabelComponent
],
  templateUrl: './invoice-index.component.html',
})
export class InvoiceIndexComponent {
  private httpClient = inject(HttpClient);

  newInvoiceName = signal<string|null>(null);
  newCustomer = signal<string>('0')
  isCreatingInvoice = false;

  onCustomerChangeHandler(value: string) {
    this.newCustomer.set(value);
  }

  onCancelCreateClickHandler() {
    this.isCreatingInvoice = false;
  }


  onCreateInvoiceClickHandler() {
    const postSub = this.httpClient.post(environment.apiUrl + 'invoices', {
      name: this.newInvoiceName(),
      customer: parseInt(this.newCustomer())
    }).subscribe({
      next: (res) => {
        this.isCreatingInvoice = false;
        postSub.unsubscribe();
      },
      error: () => {

      }
    })
  }

  /**
   * Handles the click event from the "new" button
   */
  onNewClickHandler() {
    this.isCreatingInvoice =true;
  }
}
