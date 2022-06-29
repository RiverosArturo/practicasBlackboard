import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaActividadPageRoutingModule } from './alta-actividad-routing.module';

import { AltaActividadPage } from './alta-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaActividadPageRoutingModule
  ],
  declarations: [AltaActividadPage]
})
export class AltaActividadPageModule {}
