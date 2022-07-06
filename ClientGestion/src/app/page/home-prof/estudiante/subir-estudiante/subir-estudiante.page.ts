import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subir-estudiante',
  templateUrl: './subir-estudiante.page.html',
  styleUrls: ['./subir-estudiante.page.scss'],
})
export class SubirEstudiantePage implements OnInit {
  user:number;

  constructor(private menu:MenuController, private router: Router, private activedRoute:ActivatedRoute) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf')
  }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user;
    console.log('User: ',this.user);
  }
  getNrc(user){

  }

}
