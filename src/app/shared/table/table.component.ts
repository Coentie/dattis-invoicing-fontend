import { CommonModule } from '@angular/common';
import { Component, input, Input,TemplateRef  } from '@angular/core';
import { TableDataComponent } from './table-data/table-data.component';

@Component({
  selector: 'app-table',
  imports: [
    CommonModule,
  ],
  templateUrl: './table.component.html',
})
export class TableComponent {
  rows = input.required<any[]>();
  columns = input.required<string[]>();
  template = input.required<TemplateRef<any>>();
}
