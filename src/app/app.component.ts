import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceTabelComponent } from "./invoice/invoice-tabel/invoice-tabel.component";
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { SelectData } from '../types/forms/types';
import { SelectComponent } from "./shared/forms/select/select.component";
import { map } from 'rxjs';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InvoiceTabelComponent, SelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'invoicing';
    customers = signal<SelectData[]>([]);
    private httpClient = inject(HttpClient);
    private destroyRef = inject(DestroyRef);
  

      ngOnInit() {
        const sub = this.httpClient.get<Customer[]>(environment.apiUrl + "customers").subscribe({
          next: (res: Customer[]) => {
            const mapped = res.map((customer) => { 
              return {key: `${customer.id}`, value: customer.name};
            });
            this.customers.set(mapped);
          }
        })
    
        this.destroyRef.onDestroy(() => {
          sub.unsubscribe();
        })
      }
}
