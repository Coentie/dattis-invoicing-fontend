import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Invoice } from "../../models/invoice";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    httpClient = inject(HttpClient);


    invoices = signal<Invoice[]>([]);

    constructor() {
        this.httpClient.get<Invoice[]>(environment.apiUrl + 'invoices').subscribe({
              next: (res) => {
                this.invoices.set(res);
              }
        })
    }

    pay(id: Number|string ,cb: Function) {
        const sub = this.httpClient.put<Invoice>(environment.apiUrl + `invoices/${id}`, null).subscribe({
            next: (res: Invoice) => {
              cb(res);
              sub.unsubscribe()
          }});
    }

    /**
     * Updates a single invoice in the invoices list.
     * 
     * @param {Invoice} newInvoice 
     */
    updateSingle(newInvoice: Invoice) {
        this.invoices.update(curr => {
            return curr.map((invoice: Invoice) => invoice.id === newInvoice.id ? newInvoice : invoice)
        })
    }

    /**
     * Creates a new invoice.
     * 
     * @param name 
     * @param customerId 
     * @param onSuccess 
     * @param onError 
     */
    create(name: string, customerId: Number, onSuccess: (res: any) => {}, onError = () => {}) {
        const sub = this.httpClient.post<Invoice>(environment.apiUrl + 'invoices', {
            name: name,
            customer: customerId
          })
          .subscribe({
            next: (res: Invoice) => {
                this.invoices.update(curr => [...curr, res]);
                onSuccess(res);
                sub.unsubscribe();
            },
            error: onError,
          })
    }
}
    
    