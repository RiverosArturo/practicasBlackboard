import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-actividad',
  templateUrl: './eliminar-actividad.page.html',
  styleUrls: ['./eliminar-actividad.page.scss'],
})
export class EliminarActividadPage implements OnInit {

  constructor(private menu:MenuController) { }
  
  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
  }

}
