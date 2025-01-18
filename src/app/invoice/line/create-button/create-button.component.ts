import { Component, inject, signal } from '@angular/core';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-invoice-line-button',
  imports: [
    ModalComponent,
    FormsModule
  ],
  templateUrl: './create-button.component.html',
})
export class CreateButtonComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  isCreatingLine  = false;

  name = signal<String|null>(null);
  amount = signal<Number|null>(null);
  unitPrice = signal<Number|null>(null);


  /**
   * Opens up a model.
   */
  onNewClickHandler() {
    this.isCreatingLine = true;
  }

  /**
   * Cancels the creation of an invoice line.
   */
  onCancelCreateClickHandler() {
    this.isCreatingLine = false;
    this.name.set('');
    this.amount.set(null);
    this.unitPrice.set(null);
  }

  onCreateInvoiceClickHandler() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.post(environment.apiUrl + `invoices/${id}/line`, {
      name: this.name(),
      amount: this.amount(),
      unitPrice: this.unitPrice()
    })
    .subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }
}
