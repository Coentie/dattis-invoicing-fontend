import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../../../../models/invoice';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-invoice-update',
  imports: [
    CardComponent
  ],
  templateUrl: './invoice-update.component.html',
})
export class InvoiceUpdateComponent implements OnInit {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  invoice = signal<Invoice|null>(null)

    ngOnInit() {
      const sub = this.httpClient.get<Invoice[]>(environment.apiUrl + 'invoices/').subscribe({
        next: (res: any) => {
          this.invoice.set(res);
        }
      })
  
      this.destroyRef.onDestroy(() => {
        sub.unsubscribe();
      })
    }
}
