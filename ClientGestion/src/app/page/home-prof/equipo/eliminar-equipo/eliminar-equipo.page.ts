import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-equipo',
  templateUrl: './eliminar-equipo.page.html',
  styleUrls: ['./eliminar-equipo.page.scss'],
})
export class EliminarEquipoPage implements OnInit {

  constructor(private menu:MenuController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
  }

}
