import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { InvoiceService } from '../../../invoice/invoiceService';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../../../models/invoice';

@Component({
  selector: 'app-invoice-update',
  imports: [
    CardComponent
  ],
  templateUrl: './invoice-update.component.html',
})
export class InvoiceUpdateComponent implements OnInit {
  private invoiceService = inject(InvoiceService);
  private readonly route = inject(ActivatedRoute);
  invoice = signal<Invoice|null>(null);
  
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      const invoice = await this.invoiceService.find(id)
      this.invoice.set(invoice);
    }
  }
}
