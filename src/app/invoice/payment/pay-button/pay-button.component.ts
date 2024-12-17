import { Component, inject, input, output } from '@angular/core';
import { Invoice } from '../../../../models/invoice';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-pay-button',
  imports: [],
  templateUrl: './pay-button.component.html',
})
export class PayButtonComponent {
  private httpClient = inject(HttpClient);
  invoice = input.required<Invoice>();
  paid = output<Invoice>();

  async pay() {
    const sub = this.httpClient.put<Invoice>(environment.apiUrl + `invoices/${this.invoice().id}`, null).subscribe({
      next: (res: Invoice) => {
        this.paid.emit(res);
        sub.unsubscribe()
    }});
  }
}
