import { Component, input, output, signal } from '@angular/core';
import { SelectData } from '../../../../types/forms/types';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-select',
  imports: [
    FormsModule,
  ],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  label = input<string|null>(null);
  default = input<string|null>(null);
  data = input.required<SelectData[]>();

  preSelected = input<number|null>(null);
  model = input.required<number>();
  modelChange = output<number>();

  onChangeHandler() {
    //@ts-ignore
    this.modelChange.emit(this.model);
  }
}
