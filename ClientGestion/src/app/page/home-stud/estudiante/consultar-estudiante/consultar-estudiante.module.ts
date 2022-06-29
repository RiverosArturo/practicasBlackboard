import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultarEstudiantePageRoutingModule } from './consultar-estudiante-routing.module';

import { ConsultarEstudiantePage } from './consultar-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultarEstudiantePageRoutingModule
  ],
  declarations: [ConsultarEstudiantePage]
})
export class ConsultarEstudiantePageModule {}
