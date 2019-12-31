import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule
  ]
})
export class ViewsModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: ViewsModule
  ) {
    if (parentModule) {
      throw new Error(
          'ViewsModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
