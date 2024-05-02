export class Invoice {
    CustomerId: string;
    CustomerName?: string;
    CustomerEmail?: string;
    CustomerPhone?: string;
    InvoiceId?: string;
    AmountDue?: string;
    Currency?: string;
    constructor(CustomerId: string, invoiceId: string) {
      this.CustomerId = CustomerId;
      this.InvoiceId = invoiceId;
    }
  }
  