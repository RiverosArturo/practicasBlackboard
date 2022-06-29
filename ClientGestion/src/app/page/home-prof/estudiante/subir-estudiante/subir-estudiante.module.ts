import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirEstudiantePageRoutingModule } from './subir-estudiante-routing.module';

import { SubirEstudiantePage } from './subir-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirEstudiantePageRoutingModule
  ],
  declarations: [SubirEstudiantePage]
})
export class SubirEstudiantePageModule {}
