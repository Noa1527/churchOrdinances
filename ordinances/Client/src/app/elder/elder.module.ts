import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElderComponent } from './elder.component';



@NgModule({
  declarations: [
    ElderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ElderComponent,
  ],
})
export class ElderModule { }
