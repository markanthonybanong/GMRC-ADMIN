import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataRoomService, DataPaymentService } from '@gmrc-admin/shared/services';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-search-room-payments',
  templateUrl: './search-room-payments.component.html',
  styleUrls: ['./search-room-payments.component.scss']
})
export class SearchRoomPaymentsComponent implements OnInit {
  public roomPaymentSearchForm = this.formBuilder.group({
    roomNumber: null,
    date: null,
    electricBillStatus: null,
    waterBillStatus: null,
    riceCookerBillStatus: null,
    rentStatus: null,
  });
  date: Moment;
  constructor(
    private formBuilder: FormBuilder,
    private dataRoomService: DataRoomService,
    private dataPaymentService: DataPaymentService,
  ) { }

  ngOnInit() {
    this.dataRoomService.setRooms();
  }
  get monthYear(): string {
    if (!this.date) { return null; }
    return moment(this.date).format('MM/YYYY');
  }
  chosenMonthHandler(date: Moment, datepicker: MatDatepicker<Moment>): void {
    this.date = date;
    this.roomPaymentSearchForm.get('date').setValue(this.monthYear);
    datepicker.close();
  }

}
