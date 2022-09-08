import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Chat } from 'src/app/models/chat';
import { DatosService } from 'src/app/services/datos.service';
import { WebsocketService } from 'src/app/services/websocket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  providers: [ WebsocketService ]
})
export class ChatPage implements OnInit{

  user:number;
  nrc:number;
  nTrabajador:number;
  id:number;
  curso:string;
  messengers:any=[];
  messengersEquipo:any=[];
  alumnos:any=[];
  equipos:any;
  profesores:any=[];
  chat:Chat = {
    mensaje: '',
    noTrabajador: 0,
    nrc: 0,
    id_equipo: null,
    matricula: null,
    nombre: ''
  }
  chatE:Chat = {
    mensaje: '',
    noTrabajador: 0,
    nrc: 0,
    id_equipo: null,
    matricula: null,
    nombre: ''
  }
  boton:number = 0;
  boton2:number = 0;

  constructor( private webSocketService: WebsocketService, private menu:MenuController, private datosService: DatosService,private router: Router, private activedRoute:ActivatedRoute ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;  
    this.user = params.user; 
    this.nrc = params.nrc;  
    this.nTrabajador = params.nTrabajador;
    this.id = params.id;
    this.curso = params.curso;
    this.chat = {
      mensaje: '',
      noTrabajador: this.nTrabajador,
      nrc: this.nrc,
      id_equipo: null,
      matricula: this.user,
      nombre:'',
      sala: this.curso
    }
    //this.obtenerMensajesCurso();

    //Equipo
    this.chatE = {
      mensaje: '',
      noTrabajador: this.nTrabajador,
      nrc: this.nrc,
      id_equipo: this.id,
      matricula: this.user,
      nombre:'',
      sala: '',
    }
    this.getequipoAlumno();
    //this.obtenerMensajesCursoEquipo();
  }

  navStud(){
    this.router.navigate(['/home-stud/menu-student/menu-student',this.user,this.nrc, this.curso, this.nTrabajador]);
    this.boton = 0;
    this.boton2 = 0;
    this.webSocketService.chatsEquipo = [];
    this.webSocketService.chats = [];
    let sala = this.chat.sala;
    this.webSocketService.desconectarSala(sala);
    sala = this.chatE.sala;
    this.webSocketService.desconectarSala(sala);
  }

  atras2(){
    this.boton = 0;
    this.boton2 = 0;
    this.webSocketService.chatsEquipo = [];
    this.webSocketService.chats = [];
    let sala = this.chat.sala;
    this.webSocketService.desconectarSala(sala);
    sala = this.chatE.sala;
    this.webSocketService.desconectarSala(sala);
  }

  OpenMenuStud(){
    this.menu.enable(true,'MenuStud');
    this.menu.open('MenuStud');
  }
  openmenu0(){
    this.menu.enable(true,'end');
    this.menu.open('end')
  }

  getequipoAlumno(){
    this.datosService.getid(this.id)
      .subscribe(
        res =>{       
          this.equipos = res; 
          this.equipos = this.equipos.nombre;
          this.chatE.sala = this.equipos;
        },
        err => console.error(err)
      )
  }

  obtenerMensajesCurso(){
    let sala= this.chat.sala;
    this.webSocketService.unirSala(sala);
    this.boton=2;
    this.boton2=1;
    this.datosService.obtenerMsjsCurso(this.nrc,this.nTrabajador).subscribe(
      res => {
        this.messengers = res;
        if(this.messengers.length > 0){
          this.webSocketService.chats = this.messengers;
        }else{
          console.log("No hay mensajes para mostrar!!!");
        }
      },
      err => console.error(err)
    );
  }

  obtenerMensajesCursoEquipo(){
    this.boton2 = 2;
    this.boton = 1
    //console.log(this.chatE);
    let sala= this.equipos;
    this.webSocketService.unirSala(sala);
    this.datosService.obtenerMsjsCursoEquipo(this.nrc,this.chatE.id_equipo,this.nTrabajador).subscribe(
      res => {
        this.messengersEquipo = res;
        if(this.messengersEquipo.length > 0){
          this.webSocketService.chatsEquipo = this.messengersEquipo;
        }else{
          console.log("No hay mensajes para mostrar!!!");
        }
      },
      err => console.error(err)
    );
  }

  sendMessage(){
    //obtenemos el nombre del usuario
   
      this.datosService.getStudent(this.chat.matricula).subscribe(
        res => {
          this.alumnos[this.chat.matricula] = res;
          this.chat.nombre = this.alumnos[this.chat.matricula].nombre;
          //Insertamos el mensaje a nuestra BD
          this.datosService.saveChat(this.chat).subscribe(
            res => {
              console.log(res);
            },
            err => console.error(err)
          )
          //console.log(this.chat)
          //creamos nuestra variable para interactuar con los sockets
          let messageInfo = {
            id_equipo: this.chat.id_equipo,
            matricula: this.chat.matricula,
            mensaje: this.chat.mensaje,
            noTrabajador: this.chat.noTrabajador,
            nrc: this.chat.nrc,
            nombre: this.chat.nombre,
            sala: this.chat.sala
          }

          console.log(messageInfo);
          
          //Insertamos nuestra variable a la data de los sockets
          this.webSocketService.sendMessage(messageInfo);
          this.chat.mensaje = '';
        },
        err => console.error(err)
      );
  }

  sendMessageEquipo(){
    this.datosService.getStudent(this.chatE.matricula).subscribe(
      res => {
        this.alumnos[this.chatE.matricula] = res;
          this.chatE.nombre = this.alumnos[this.chatE.matricula].nombre;
        //Insertamos el mensaje a nuestra BD
        this.datosService.saveChat(this.chatE).subscribe(
          res => {
            console.log(res);
          },
          err => console.error(err)
        )
        //console.log(this.chat)
        //creamos nuestra variable para interactuar con los sockets
        console.log("ChatE: " + this.chatE.id_equipo);
        let messageInfo = {
          id_equipo: this.chatE.id_equipo,
          matricula: this.chatE.matricula,
          mensaje: this.chatE.mensaje,
          noTrabajador: this.chatE.noTrabajador,
          nrc: this.chatE.nrc,
          nombre: this.chatE.nombre,
          sala: this.chatE.sala
        }

        console.log("messgeI: " + messageInfo.id_equipo);
        
        //Insertamos nuestra variable a la data de los sockets
        this.webSocketService.sendMessageEquipo(messageInfo);
        this.chatE.mensaje = '';
      },
      err => console.error(err)
    );
  }

  conectarCurso(){
    let messageInfo = {
      id_equipo: this.chat.id_equipo,
      matricula: this.chat.matricula,
      mensaje: this.chat.mensaje,
      noTrabajador: this.chat.noTrabajador,
      nrc: this.chat.nrc,
      nombre: this.chat.nombre,
      sala: this.chat.sala
    }
    
    //Insertamos nuestra variable a la data de los sockets
    this.webSocketService.sendMessage(messageInfo);
    this.chat.mensaje = '';
  }

}
