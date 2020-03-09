import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PaymentStore {
    public paymentTableName:string;
    constructor(private router: Router) {}
    onEntry(): void {
        this.router.navigate(['payment/entry']);
    }
    onRoom(): void {
        this.router.navigate(['payment/room']);
    }
    onPenalty(): void {
        this.router.navigate(['payment/penalty']);
    }
    onUnsettleBill(): void {
        this.router.navigate(['payment/unsettle-bill']);
    }
    onSetTableName($event: any): void {
        this.paymentTableName = $event.store.tableName;
    }
}
