import { NgModule } from '@angular/core';
import { CurrencyFormComponent } from './currency-form/currency-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CurrencyFormComponent],
  imports: [SharedModule],
  exports: [CurrencyFormComponent],
})
export class LayoutsModule {}
