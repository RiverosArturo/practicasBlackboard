import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-actividad',
  templateUrl: './modificar-actividad.page.html',
  styleUrls: ['./modificar-actividad.page.scss'],
})
export class ModificarActividadPage implements OnInit {

  constructor(private menu:MenuController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
  }

}
