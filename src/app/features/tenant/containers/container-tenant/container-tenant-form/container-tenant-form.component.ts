import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TenantFormStoreState } from '../../../services/tenant/tenant-form/tenant-form.store.state';
import { RequestResponse } from '@gmrc-admin/shared/enums';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-container-tenant-form',
  templateUrl: './container-tenant-form.component.html',
  styleUrls: ['./container-tenant-form.component.scss']
})
export class ContainerTenantFormComponent implements OnInit {
  @Input() state$: Observable<TenantFormStoreState>;
  @Input() requestResponse: RequestResponse;
  @Input() tenantForm: FormGroup;
  @Input() genders: Array<string>;
  @Input() networks: Array<string>;
  @Input() roomNumbers: Array<number>;
  @Input() tenantImgHover: boolean;
  @Output() containerTenantFormOnBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerTenantFormOnSubmit: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerTenantFormOnTenantImgMouseEnter: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerTenantFormOnTenantImgMouseLeave: EventEmitter<null> = new EventEmitter<null>();
  @Output() containerTenantFormOnSelectPhoto: EventEmitter<null> = new EventEmitter<null>();
  constructor() { }

  ngOnInit() {
  }
  onBack(): void {
    this.containerTenantFormOnBack.emit();
  }
  onSubmit(): void {
    this.containerTenantFormOnSubmit.emit();
  }
  onTenantImgMouseEnter(): void {
    console.log('enterred here ');
    this.containerTenantFormOnTenantImgMouseEnter.emit();
  }
  onTenantImgMouseLeave(): void {
    this.containerTenantFormOnTenantImgMouseLeave.emit();
  }
  onSelectPhoto(): void {
    this.containerTenantFormOnSelectPhoto.emit();
  }

}
