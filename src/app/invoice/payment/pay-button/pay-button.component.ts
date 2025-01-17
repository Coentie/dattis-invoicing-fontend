import { Component, inject, input, output } from '@angular/core';
import { Invoice } from '../../../../models/invoice';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { environment } from '../../../../environments/environment.development';
import { InvoiceService } from '../../invoiceService';

@Component({
  selector: 'app-pay-button',
  imports: [],
  templateUrl: './pay-button.component.html',
})
export class PayButtonComponent {
 invoiceService = inject(InvoiceService);
  invoice = input.required<Invoice>();
  paid = output<Invoice>();

  pay() {
    this.invoiceService.pay(this.invoice().id, (res: Invoice) => {
      this.paid.emit(res);
    })
  }
}
