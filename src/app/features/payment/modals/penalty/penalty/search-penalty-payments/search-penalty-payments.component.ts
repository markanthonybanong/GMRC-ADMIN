import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataRoomService, DataPaymentService, DataTenantService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-search-penalty-payments',
  templateUrl: './search-penalty-payments.component.html',
  styleUrls: ['./search-penalty-payments.component.scss']
})
export class SearchPenaltyPaymentsComponent implements OnInit {
  public penaltySearchForm = this.formBuilder.group({
    roomNumber: null,
    date: null,
    tenantName: null,
    tenantObjectId: null,
    paymentStatus: null,
  });
 
  constructor(
    private formBuilder: FormBuilder,
    private dataRoomService: DataRoomService,
    private dataPaymentService: DataPaymentService,
    private dataTenantService: DataTenantService
  ) { }

  ngOnInit() {
     
  }
  setTenantObjectId(tenantObjId: string): void {
    this.penaltySearchForm.get('tenantObjectId').patchValue(tenantObjId);
  }
  

}
