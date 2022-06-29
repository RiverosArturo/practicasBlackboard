import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarEstudiantePageRoutingModule } from './modificar-estudiante-routing.module';

import { ModificarEstudiantePage } from './modificar-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarEstudiantePageRoutingModule
  ],
  declarations: [ModificarEstudiantePage]
})
export class ModificarEstudiantePageModule {}
