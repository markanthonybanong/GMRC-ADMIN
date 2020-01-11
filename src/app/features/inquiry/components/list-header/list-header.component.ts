import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  @Output() addInquiry = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onAddInquiry(): void {
    this.addInquiry.emit();
  }

}
