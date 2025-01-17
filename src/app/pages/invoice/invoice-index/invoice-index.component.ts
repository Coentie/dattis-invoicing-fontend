import { Component, inject, signal } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { CustomerDropdownComponent } from '../../../customer/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { InvoiceTabelComponent } from "../../../invoice/invoice-tabel/invoice-tabel.component";
import { InvoiceService } from '../../../invoice/invoiceService';
import { Invoice } from '../../../../models/invoice';

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
  private InvoiceService = inject(InvoiceService);

  newInvoiceName = signal<string|null>(null);
  newCustomer = signal<string>('0')
  isCreatingInvoice = false;

  onCustomerChangeHandler(value: string) {
    this.newCustomer.set(value);
  }

  onCancelCreateClickHandler() {
    this.isCreatingInvoice = false;
  }

  /**
   * Handler for on create click action.
   */
  onCreateInvoiceClickHandler() {
    this.InvoiceService.create(
      this.newInvoiceName()!,
      parseInt(this.newCustomer()),
      (res: Invoice) => this.isCreatingInvoice = false
    );
  }


  /**
   * Handles the click event from the "new" button
   */
  onNewClickHandler() {
    this.isCreatingInvoice =true;
  }
}
