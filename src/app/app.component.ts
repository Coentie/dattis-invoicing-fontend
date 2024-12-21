import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceTabelComponent } from "./invoice/invoice-tabel/invoice-tabel.component";
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { SelectData } from '../types/forms/types';
import { SelectComponent } from "./shared/forms/select/select.component";
import { map } from 'rxjs';
import { environment } from '../environments/environment.development';
import { ModalComponent } from "./shared/modal/modal.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InvoiceTabelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
