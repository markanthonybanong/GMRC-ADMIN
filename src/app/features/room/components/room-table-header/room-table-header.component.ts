import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-room-table-header',
  templateUrl: './room-table-header.component.html',
  styleUrls: ['./room-table-header.component.scss']
})
export class RoomTableHeaderComponent implements OnInit {
  @Output() roomSearch: EventEmitter<null> = new EventEmitter<null>();
  @Output() roomDisplayAllRooms: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }
  onSearch(): void {
   this.roomSearch.emit();
  }
  onDisplayAllRooms(): void {
    this.roomDisplayAllRooms.emit();
  }
}

