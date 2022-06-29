import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultarCursoPageRoutingModule } from './consultar-curso-routing.module';

import { ConsultarCursoPage } from './consultar-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultarCursoPageRoutingModule
  ],
  declarations: [ConsultarCursoPage]
})
export class ConsultarCursoPageModule {}
