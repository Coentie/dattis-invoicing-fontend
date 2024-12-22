import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { SelectData } from '../../../../types/forms/types';
import { HttpClient } from '@angular/common/http';
import { Tax } from '../../../../models/tax';
import { environment } from '../../../../environments/environment.development';
import { SelectComponent } from '../../../shared/forms/select/select.component';

@Component({
  selector: 'app-tax-dropdown',
  imports: [
    SelectComponent
  ],
  templateUrl: './tax-dropdown.component.html',
})
export class TaxDropdownComponent {
  title = 'Belastingtarieven';
  taxRates = signal<SelectData[]>([]);
  
  taxRate = input<SelectData|null>(null);
  taxRateChange = output<SelectData|null>();

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);


    ngOnInit() {
      const sub = this.httpClient.get<Tax[]>(environment.apiUrl + "tax-rates").subscribe({
        next: (res: Tax[]) => {
          const mapped = res.map((taxRate) => { 
            return {key: `${taxRate.id}`, value: taxRate.name};
          });
          this.taxRates.set(mapped);
        }
      })
  
      this.destroyRef.onDestroy(() => {
        sub.unsubscribe();
      })
    }
}
