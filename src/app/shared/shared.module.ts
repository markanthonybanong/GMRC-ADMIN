import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './modules/angular-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    AngularMaterialModule
  ]
})
export class SharedModule { }
