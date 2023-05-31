import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpComponent } from './bp.component';



@NgModule({
  declarations: [
    BpComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BpComponent,
  ],
})
export class BpModule { }
