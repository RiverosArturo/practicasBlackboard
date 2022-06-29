import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar-estudiante',
  templateUrl: './eliminar-estudiante.page.html',
  styleUrls: ['./eliminar-estudiante.page.scss'],
})
export class EliminarEstudiantePage implements OnInit {

  constructor(private menu:MenuController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
  }

}
