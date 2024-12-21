import { Component, DestroyRef, inject, signal } from '@angular/core';
import { SelectData } from '../../../types/forms/types';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../../models/customer';
import { environment } from '../../../environments/environment.development';
import { SelectComponent } from '../../shared/forms/select/select.component';

@Component({
  selector: 'app-customer-dropdown',
  imports: [
    SelectComponent
  ],
  templateUrl: './dropdown.component.html',
})
export class CustomerDropdownComponent {
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
