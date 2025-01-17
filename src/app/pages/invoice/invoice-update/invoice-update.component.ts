import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../../../../models/invoice';
import { environment } from '../../../../environments/environment.development';
import { InvoiceService } from '../../../invoice/invoiceService';
import { ActivatedRoute } from '@angular/router';

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
  
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      const invoice = await this.invoiceService.find(id)
    }
  }
}
