import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluarActividadPageRoutingModule } from './evaluar-actividad-routing.module';

import { EvaluarActividadPage } from './evaluar-actividad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluarActividadPageRoutingModule
  ],
  declarations: [EvaluarActividadPage]
})
export class EvaluarActividadPageModule {}
