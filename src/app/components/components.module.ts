import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaserComponent } from './increaser/increaser.component';
import { FormsModule } from '@angular/forms';
import { DonutComponent } from './donut/donut.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [
    IncreaserComponent,
    DonutComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncreaserComponent,
    DonutComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
