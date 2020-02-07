import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TenantFormStoreState } from '../../../services/tenant/tenant-form/tenant-form.store.state';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss']
})
export class TenantFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() state: TenantFormStoreState;
  @Input() genders: Array<string>;
  @Input() networks: Array<string>;
  @Input() roomNumbers: Array<string>;
  @Input() tenantImgHover: boolean;
  @Output() tenantFormOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() tenantFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output() tenantFormOnTenantImgMouseEnter: EventEmitter<null> = new EventEmitter<null>();
  @Output() tenantFormOnTenantImgMouseLeave: EventEmitter<null> = new EventEmitter<null>();
  @Output() tenantFormOnSelectPhoto: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }
  onBack(): void {
    this.tenantFormOnBack.emit();
  }
  onSubmit(): void {
    this.tenantFormOnSubmit.emit();
  }
  onTenantImgMouseEnter(): void {
    this.tenantFormOnTenantImgMouseEnter.emit();
  }
  onTenantImgMouseLeave(): void {
    this.tenantFormOnTenantImgMouseLeave.emit();
  }
  onSelectPhoto(): void {
    this.tenantFormOnSelectPhoto.emit();
  }
}
