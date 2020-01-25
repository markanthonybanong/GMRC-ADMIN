import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SearchComponent } from '../../modals/search/search.component';
import { INQUIRY_CONFIG } from '../../inquiry.config';

@Component({
  selector: 'app-inquiry-header',
  templateUrl: './inquiry-header.component.html',
  styleUrls: ['./inquiry-header.component.scss']
})
export class InquiryHeaderComponent implements OnInit {
  @Output() listAddInquiry: EventEmitter<null> = new EventEmitter<null>();
  @Output() listSearch: EventEmitter<object> = new EventEmitter<object>();
  @Output() listDisplayAllInquiry: EventEmitter<null> = new EventEmitter<null>();
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  onAddInquiry(): void {
    this.listAddInquiry.emit();
  }
  onSearch(): void {
    const dialogRef = this.dialog.open(SearchComponent, {
      data: {
        title: INQUIRY_CONFIG.actions.search,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.listSearch.emit(result);
      }
    });
  }
  onDisplayAllInquiry(): void {
    this.listDisplayAllInquiry.emit();
  }


}
