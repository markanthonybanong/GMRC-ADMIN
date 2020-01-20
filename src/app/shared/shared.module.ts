import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ActionResponseComponent } from './modals/action-response/action-response.component';
import { ActionResponseErrorDirective } from './directives/action-response-error.directive';
import { ConfirmationComponent } from './modals/confirmation/confirmation.component';
import { SetParentElHeightDirective } from './directives/set-parent-el-height.directive';

@NgModule({
  declarations: [ActionResponseComponent, ActionResponseErrorDirective, ConfirmationComponent, SetParentElHeightDirective],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    AngularMaterialModule,
    SetParentElHeightDirective
  ],
})
export class SharedModule { }
