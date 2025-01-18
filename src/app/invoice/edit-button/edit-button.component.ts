import { Component, inject, input } from '@angular/core';
import { Invoice } from '../../../models/invoice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-button',
  imports: [],
  templateUrl: './edit-button.component.html',
})
export class EditButtonComponent {
  router = inject(Router);

  invoice = input.required<Invoice>();

  edit() {
    this.router.navigate([`/invoices/${this.invoice().id}`]);;
  }
}
