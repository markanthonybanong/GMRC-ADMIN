import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material.module';
import { ActionResponseComponent } from './modals/action-response/action-response.component';
import { ActionResponseErrorDirective } from './directives/action-response-error.directive';
import { ConfirmationComponent } from './modals/confirmation/confirmation.component';
import { SetParentElHeightDirective } from './directives/set-parent-el-height.directive';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { InProgressErrorComponent } from './components/in-progress-error/in-progress-error.component';

@NgModule({
  declarations: [
    ActionResponseComponent,
    ActionResponseErrorDirective,
    ConfirmationComponent,
    SetParentElHeightDirective,
    PaginatorComponent,
    InProgressErrorComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    AngularMaterialModule,
    SetParentElHeightDirective,
    ActionResponseComponent,
    PaginatorComponent,
    InProgressErrorComponent,
  ],
  entryComponents: [
    ActionResponseComponent
  ]
})
export class SharedModule { }
