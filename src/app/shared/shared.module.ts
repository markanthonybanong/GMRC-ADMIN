import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ActionResponseComponent } from './modals/action-response/action-response.component';
import { ErrorResponseDirective } from './directives/error-response.directive';

@NgModule({
  declarations: [ActionResponseComponent, ErrorResponseDirective],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    AngularMaterialModule
  ],
})
export class SharedModule { }
