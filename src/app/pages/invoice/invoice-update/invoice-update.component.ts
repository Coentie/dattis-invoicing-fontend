import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../../shared/card/card.component';
import { InvoiceService } from '../../../invoice/invoiceService';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../../../models/invoice';
import { CreateButtonComponent } from "../../../invoice/line/create-button/create-button.component";
import { TableComponent } from '../../../shared/table/table.component';
import { TableDataComponent } from '../../../shared/table/table-data/table-data.component';

@Component({
  selector: 'app-invoice-update',
  imports: [
    CardComponent,
    CreateButtonComponent,
    TableComponent,
    TableDataComponent,
],
  templateUrl: './invoice-update.component.html',
})
export class InvoiceUpdateComponent implements OnInit {
  private invoiceService = inject(InvoiceService);
  private readonly route = inject(ActivatedRoute);
  invoice = signal<Invoice|null>(null);

  
  get columns() {
    return [
      'id', 
      'name',
      'amount',
      'price',
      'actions'
    ]
  }
  
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if(id) {
      const invoice = await this.invoiceService.find(id)
      this.invoice.set(invoice);
    }
  }
}
