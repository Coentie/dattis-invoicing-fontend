import { Component, input } from '@angular/core';
import { SelectData } from '../../../../types/forms/types';
@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  label = input<string|null>(null);
  default = input<string|null>(null);
  data = input.required<SelectData[]>();
}
