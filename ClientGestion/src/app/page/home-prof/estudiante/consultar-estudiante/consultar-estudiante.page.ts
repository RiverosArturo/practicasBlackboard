import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-consultar-estudiante',
  templateUrl: './consultar-estudiante.page.html',
  styleUrls: ['./consultar-estudiante.page.scss'],
})
export class ConsultarEstudiantePage implements OnInit {

  constructor(private menu:MenuController) { }

  games: any = []; 

  ngOnInit() {
    
  }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

}
