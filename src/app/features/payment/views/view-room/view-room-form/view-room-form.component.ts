import { Component, OnInit } from '@angular/core';
import { RoomFormStore } from '../../../services/room/room-form/room-form.store';
import { RoomFormEndpoint } from '../../../services/room/room-form/room-form.endpoint';
import { DataStoreService, DataRoomService, DataPaymentService, DataRoomPaymentService } from '@gmrc-admin/shared/services';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { PAYMENT_CONFIG } from '../../../payment.config';

@Component({
  selector: 'app-view-room-form',
  templateUrl: './view-room-form.component.html',
  styleUrls: ['./view-room-form.component.scss'],
  providers: [RoomFormStore, RoomFormEndpoint]
})
export class ViewRoomFormComponent implements OnInit {

  constructor(
    private store: RoomFormStore,
    private dataStoreService: DataStoreService,
    private dataRoomService: DataRoomService,
    private dataPaymentService: DataPaymentService,
    private dataRoomPaymentService: DataRoomPaymentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscribeToRouteParamater();
    this.store.init();
  }
  private subscribeToRouteParamater(): void {
    this.route.paramMap
    .pipe(
      filter( (params) => params.get('id') !== null),
      tap((params) => {
        this.store.setState({
          ...this.store.state,
          isUpdate: true,
          pageRequest: {
            ...this.store.state.pageRequest,
            filters: {
              type: PAYMENT_CONFIG.filter.type.ROOMPAYMENTBYOBJECTID,
              roomPaymentObjectId: params.get('id')
            }
          }
        });
      })
    )
    .subscribe();
  }

}
