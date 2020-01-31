import { Component, OnInit, OnDestroy } from '@angular/core';
import { BedspaceRoomFormStore } from '../../services/bedspace-room-form/bedspace-room-form.store';
import { BedspaceRoomFormEndpoint } from '../../services/bedspace-room-form/bedspace-room-form.endpoint';
import { ROOM_CONFIG } from '../../room.config';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { DataRoomService } from '@gmrc-admin/shared/services';

@Component({
  selector: 'app-view-bedspace-room-form',
  templateUrl: './view-bedspace-room-form.component.html',
  styleUrls: ['./view-bedspace-room-form.component.scss'],
  providers: [BedspaceRoomFormStore, BedspaceRoomFormEndpoint]
})
export class ViewBedspaceRoomFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: BedspaceRoomFormStore,
    private route: ActivatedRoute,
    private dataRoomService: DataRoomService,
  ) { }

  ngOnInit() {
    this.subscribeToRouteParamater();
    this.store.init();
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
              type: ROOM_CONFIG.filters.types.BEDSPACEROOMBYOBJECTID,
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
