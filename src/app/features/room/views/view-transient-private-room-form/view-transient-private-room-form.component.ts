import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TransientPrivateRoomFormStore } from '../../services/transient-private-room-form/transient-private-room-form.store';
import { ActivatedRoute } from '@angular/router';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { ROOM_CONFIG } from '../../room.config';
import { TransientPrivateRoomFormEndpoint } from '../../services/transient-private-room-form/transient-private-room-form.endpoint';
import { DataRoomService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-transient-private-room-form',
  templateUrl: './view-transient-private-room-form.component.html',
  styleUrls: ['./view-transient-private-room-form.component.scss'],
  providers: [TransientPrivateRoomFormStore, TransientPrivateRoomFormEndpoint],
})
export class ViewTransientPrivateRoomFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private store: TransientPrivateRoomFormStore,
    private route: ActivatedRoute,
    private dataRoomService: DataRoomService
  ) { }

  ngOnInit() {
    this.subscribeToRouteParamater();
    this.store.init();
    this.dataRoomService.init();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
              type: ROOM_CONFIG.filters.types.TRANSIENTPRIVATEROOMBYOBJECTID,
              roomObjectId: params.get('id')
            }
          }
        });
      }),
      takeUntil(this.destroy$)
    )
    .subscribe();
  }
}
