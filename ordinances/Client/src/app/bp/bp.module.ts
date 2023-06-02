import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpComponent } from './bp.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    BpComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  exports: [
    BpComponent,
  ],
})
export class BpModule { }
