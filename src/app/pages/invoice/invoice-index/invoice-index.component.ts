import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Invoice } from '../../../../models/invoice';
import { environment } from '../../../../environments/environment.development';
import { CardComponent } from '../../../shared/card/card.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { CustomerDropdownComponent } from '../../../customer/dropdown/dropdown.component';
import { TaxDropdownComponent } from '../../../finance/tax/tax-dropdown/tax-dropdown.component';
import { FormsModule } from '@angular/forms';
import { InvoiceTabelComponent } from "../../../invoice/invoice-tabel/invoice-tabel.component";
import { SelectData } from '../../../../types/forms/types';

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
  newInvoiceName = signal<string|null>(null);
  newCustomer = signal<number|null>(null)
  isCreatingInvoice = false;

  private httpClient = inject(HttpClient);

  onCustomerChangeHandler(value: number) {
    this.newCustomer.set(value);
  }

  onCancelCreateClickHandler() {
    this.isCreatingInvoice = false;
  }


  onCreateInvoiceClickHandler() {
    const postSub = this.httpClient.post(environment.apiUrl + 'invoices', {
      name: this.newInvoiceName(),
      customer: this.newCustomer()
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
    this.isCreatingInvoice =true;
  }
}
