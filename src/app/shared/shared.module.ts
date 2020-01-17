import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ActionResponseComponent } from './modals/action-response/action-response.component';
import { ActionResponseErrorDirective } from './directives/action-response-error.directive';

@NgModule({
  declarations: [ActionResponseComponent, ActionResponseErrorDirective],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    AngularMaterialModule
  ],
})
export class SharedModule { }
