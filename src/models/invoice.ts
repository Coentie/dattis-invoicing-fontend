import { Customer } from "./customer"
import { invoiceLine } from "./invoiceLine"
import { InvoiceStatus } from "./invoiceStatus"

export interface Invoice {
    id: Number,
    customerId: Number, 
    invoiceStatusId: Number,

    name: string,
    paid: boolean,

    created_at: Date|String,
    updated_at: Date|String

    customer: Customer|null,
    invoiceStatus: InvoiceStatus|null,
    invoiceLines: invoiceLine[]
}
