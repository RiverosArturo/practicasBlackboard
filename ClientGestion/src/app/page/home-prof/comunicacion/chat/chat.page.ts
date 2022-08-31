import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Chat } from 'src/app/models/chat';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  menu: any;
  user:number;
  nrc:number;
  alert:string;
  messengers:any=[];
  alumnos:any=[];
  profesores:any=[];
  date:Date;
  output:string;
  chat:Chat = {
    mensaje: '',
    noTrabajador: 0,
    nrc: 0,
    id_equipo: null,
    matricula: null
  }

  constructor( private datosService: DatosService, public alertController:AlertController, private router: Router, private activedRoute:ActivatedRoute) { }

  OpenMenuProf(){
    this.menu.enable(true,'MenuProf');
    this.menu.open('MenuProf');
  }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user; 
    this.nrc = params.nrc;  
    this.chat = {
      mensaje: '',
      noTrabajador: this.user,
      nrc: this.nrc,
      id_equipo: null,
      matricula: null
    }
    this.obtenerMensajesCurso();
    for(let i = 0; i<=10; i++){
      if(i>0 && i<10){
        this.obtenerMensajesCurso();
      }else{
        i=0;
      }
    }
    this.date = new Date();
    this.output = String(this.date.getDate()).padStart(2, '0') + '/' + String(this.date.getMonth() + 1).padStart(2, '0') + '/' + this.date.getFullYear();
    console.log(this.output); 
  }


  navProf(){
    this.router.navigate(['/home-prof/home-prof/menu-prof',this.user,this.nrc]);
  }

  obtenerMensajesCurso(){
    this.datosService.obtenerMsjsCurso(this.nrc,this.user).subscribe(
      res => {
        this.messengers = res; 
        if(this.messengers.length > 0){
          console.log("si hay mensajes para mostrar!!!");
          for(let i = 0; i<=this.messengers.length;i++){
            
            if(this.messengers[i].matricula != null){
              
              this.datosService.getStudent(this.messengers[i].matricula).subscribe(
                res => {
                  this.alumnos[this.messengers[i].matricula] = res; 
                },
                err => console.error(err)
              );
            }else if(this.messengers[i].noTrabajador != null){
              
              this.datosService.getProf(this.messengers[i].noTrabajador).subscribe(
                res => {
                  this.profesores[this.messengers[i].noTrabajador] = res; 
                },
                err => console.error(err)
              );
            }
          }
        }else{
          this.alert = 'Aun nadie ha enviado mensajes para mostrar!!!';
        }

      },
      err => console.error(err)
    );
  }
  enviarMensaje(){
    ///// query que inserta msj en la bd/////////////
    console.log(this.chat);
    this.datosService.saveChat(this.chat).subscribe(
      res => {
        console.log(res);
        
        this.datosService.obtenerMsjsCurso(this.nrc,this.user).subscribe(
          res => {
            this.messengers = res; 
          },
          err => console.error(err)
        );
      },
      err => console.error(err)
    )
    this.obtenerMensajesCurso();
    this.chat.mensaje = '';
    console.log(this.chat)

  }

}
