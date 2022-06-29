import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-subir-estudiante',
  templateUrl: './subir-estudiante.page.html',
  styleUrls: ['./subir-estudiante.page.scss'],
})
export class SubirEstudiantePage implements OnInit {

  constructor(private menu:MenuController) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
  }

}
