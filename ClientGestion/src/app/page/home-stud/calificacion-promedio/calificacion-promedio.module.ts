import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificacionPromedioPageRoutingModule } from './calificacion-promedio-routing.module';

import { CalificacionPromedioPage } from './calificacion-promedio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalificacionPromedioPageRoutingModule
  ],
  declarations: [CalificacionPromedioPage]
})
export class CalificacionPromedioPageModule {}
