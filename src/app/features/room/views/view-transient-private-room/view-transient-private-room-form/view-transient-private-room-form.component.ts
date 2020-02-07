import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TransientPrivateRoomFormStore } from '../../../services/transient-private-room/transient-private-room-form/transient-private-room-form.store';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { ROOM_CONFIG } from '../../../room.config';
import { TransientPrivateRoomFormEndpoint } from '../../../services/transient-private-room/transient-private-room-form/transient-private-room-form.endpoint';
import { DataRoomService, DataStoreService, DataTenantService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-transient-private-room-form',
  templateUrl: './view-transient-private-room-form.component.html',
  styleUrls: ['./view-transient-private-room-form.component.scss'],
  providers: [TransientPrivateRoomFormStore, TransientPrivateRoomFormEndpoint],
})
export class ViewTransientPrivateRoomFormComponent implements OnInit {
  constructor(
    private store: TransientPrivateRoomFormStore,
    private route: ActivatedRoute,
    private dataRoomService: DataRoomService,
    private dataStoreService: DataStoreService,
    private dataTenantService: DataTenantService
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
          pageRequest: {
            ...this.store.state.pageRequest,
            filters: {
              type: ROOM_CONFIG.filter.type.TRANSIENTPRIVATEROOMBYOBJECTID,
              roomObjectId: params.get('id')
            }
          }
        });
      })
    )
    .subscribe();
  }
}
