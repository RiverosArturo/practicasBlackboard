import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from '../models/Student';
import { Prof }  from '../models/Prof';
import { Curso } from '../models/Curso';
import { Login }  from '../models/Login';
import { ProfCourse } from '../models/ProfCourse';
import { StudCourse } from '../models/StudCourse';
import { Equipo } from '../models/Equipo';

import { Observable, Subject} from 'rxjs';
import { cursoEstudiante } from '../models/cursoEstudiante';
import { Actividad } from '../models/Actividad';
import { Aviso } from '../models/Aviso';
import { Chat } from '../models/chat';
import { tap } from 'rxjs/operators'
import { EliminarActividadPage } from '../page/home-prof/actividades/eliminar-actividad/eliminar-actividad.page';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  nTrabajdor:number;

  API_URI = 'http://localhost:3000/api'; 
  private _refresh$ = new Subject<void>();

  get refresh$(){
    return this._refresh$;
  }

  constructor(private http: HttpClient) { }
  
///////////////////////////////////////////////////////////////////////
//-- Funcions Actividad, perfil estudiante.
getActividad() {
  return this.http.get(`${this.API_URI}/actividad`);
}



///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//  funciones sStudent course---------------------------------------------------
  listaEstudianteCurso() {
    return this.http.get(`${this.API_URI}/studCourse`);
  }
  getOneCursoEst(nrc:number, nTrabajador:number, matricula:number) {
    return this.http.get(`${this.API_URI}/studCourse/${nrc}/${nTrabajador}/${matricula}`);
  }
  crearCursoEst(subirEst:cursoEstudiante){
    return this.http.post(`${this.API_URI}/studCourse`, subirEst);
  }
  getStudCourseBien(nrc: number, nTrabajador: number){
    return this.http.get(`${this.API_URI}/studCourse/${nrc}/${nTrabajador}`);
  }
  getStudCourse(nrc: number, nTrabajador: number){
    return this.http.get(`${this.API_URI}/studCourse/${nrc}/${nTrabajador}`);
  }
  deleteStudCourse(matricula: number, nrc:number, nTrabajador:number){
    return this.http.delete(`${this.API_URI}/studCourse/${matricula}/${nrc}/${nTrabajador}`);
  }
  deleteAllStudCourse(nrc:number, nTrabajador:number){
    return this.http.delete(`${this.API_URI}/studCourse/${nrc}/${nTrabajador}`);
  }  
  updateStudCourse(matricula: number, updateStudent: Student):Observable<Student> {
    return this.http.put(`${this.API_URI}/studCourse/${matricula}`, updateStudent);
  }

//----------------------- Funciones equipo desde perfil profesor -----------------------------------------//
getid(id:number) {
  return this.http.get(`${this.API_URI}/equipo/${id}`);
}
getEquipo(id:number, nombre:string, nrc:number, nTrabajador:number) {
  return this.http.get(`${this.API_URI}/equipo/${id}/${nombre}/${nrc}/${nTrabajador}`);
}
//lista los equipos en la consulta
getEquipos1(nrc:number, nTrabajador:number) {    
  return this.http.get(`${this.API_URI}/equipo/${nrc}/${nTrabajador}`);
}
getEquipos() {//no tocar
  return this.http.get(`${this.API_URI}/equipo`);
}
saveEquipo(equipo: Equipo){
  return this.http.post(`${this.API_URI}/equipo/`,equipo);
}/*
deleteEquipo(id: number, nombre:string, nrc:number, nTrabajador:number){
  return this.http.delete(`${this.API_URI}/equipo/${id}/${nombre}/${nrc}/${nTrabajador}`);
}*/
deleteAllEquipos(nrc: number, nTrabajador:number){
  return this.http.delete(`${this.API_URI}/equipo/${nrc}/${nTrabajador}`);
}
// updateEquipo(matricula: number, updateStudent: Student):Observable<Student> {
//   return this.http.put(`${this.API_URI}/equipo/${matricula}`, updateStudent);
// }

//------------- EQUIPOS ESTUDIANTES DESDE EL PERFIL PROFESOR ------------------//

saveStudentEquipo(studentEquipo: Equipo){//
  return this.http.post(`${this.API_URI}/equipoStudents/`,studentEquipo);
}
getEquiposE() {
  return this.http.get(`${this.API_URI}/equipoStudents/`);
}
getOneEquipo(id: number){
  return this.http.get(`${this.API_URI}/equipoStudents/${id}`);
}
getStudentEquipo(matricula: number, nTrabajador:number ){
  return this.http.get(`${this.API_URI}/equipoStudents/${matricula}/${nTrabajador}`);
}
// getNameEquipo(id:number, nrc:number ,nTrabajador:number ){
//   return this.http.get(`${this.API_URI}/equipo/${id}/${nrc}/${nTrabajador}`);
// }
getEquipoStud(nTrabajador: number, nrc: number, id: number){
  return this.http.get(`${this.API_URI}/equipoStudents/${nTrabajador}/${nrc}/${id}`);
}
updateEquipo(id:number,nrc:number,nTrabajador:number, updateNameEquipo:Equipo){
  return this.http.put(`${this.API_URI}/equipo/${id}/${nrc}/${nTrabajador}`, updateNameEquipo);
}
deleteStudentEquipo(matricula:number, id:number, nrc: number, nTrabajador:number){
  return this.http.delete(`${this.API_URI}/equipoStudents/${matricula}/${id}/${nrc}/${nTrabajador}`);
}
deleteStudentsEquipo(id:number, nrc: number, nTrabajador:number){
  return this.http.delete(`${this.API_URI}/equipoStudents/${id}/${nrc}/${nTrabajador}`);
}
deleteEquipo(id: number, nrc:number, nTrabajador:number){
  return this.http.delete(`${this.API_URI}/equipo/${id}/${nrc}/${nTrabajador}`);
}
//----------------------FUNCIONES ACTIVIDAD -----------------------------------//
getActivity(nrc:number, noTrabajador:number){
  return this.http.get(`${this.API_URI}/actividad/${nrc}/${noTrabajador}`);
}
getActivityEq(nrc:number, noTrabajador:number){
  return this.http.get(`${this.API_URI}/comodin/${nrc}/${noTrabajador}`);
}
getActivityEs(nrc:number, noTrabajador:number, matricula:number){
  return this.http.get(`${this.API_URI}/comodin/${nrc}/${noTrabajador}/${matricula}`);
}
getActivityEqEs(nrc:number, noTrabajador:number, matricula:number, id_equipo:number){
  return this.http.get(`${this.API_URI}/comodin/${nrc}/${noTrabajador}/${matricula}/${id_equipo}`);
}

///Evaluar actividad
act(nrc:number, noTrabajador:number,id:string){
  return this.http.get(`${this.API_URI}/admi/${nrc}/${noTrabajador}/${id}`);
}
actE(nrc:number, noTrabajador:number,id:string, id_equipo:number){
  return this.http.get(`${this.API_URI}/admi/${nrc}/${noTrabajador}/${id}/${id_equipo}`);
}
////////////////////////////////
getOneActividad(id:string,nrc:number,noTrabajador:number){
  return this.http.get(`${this.API_URI}/actividad/${id}/${nrc}/${noTrabajador}`);
}
getOneActividadEq(id:string, nrc:number, id_equipo:number, noTrabajador:number){
  return this.http.get(`${this.API_URI}/actividad/${id}/${nrc}/${id_equipo}/${noTrabajador}`);
}
saveActividad(actividad: Actividad){
  return this.http.post(`${this.API_URI}/actividad/`,actividad);
}
actualizarAct(id:string,nrc:number,noTrabajador:number,updateAct:Actividad){
  return this.http.put(`${this.API_URI}/actividad/${id}/${nrc}/${noTrabajador}`,updateAct);
}
actualizarActAl(id:string,nrc:number,noTrabajador:number,matricula:number,updateAct:Actividad){
  return this.http.put(`${this.API_URI}/comodin/${id}/${nrc}/${noTrabajador}/${matricula}`,updateAct);
}
actualizarActEq(id:string,nrc:number,noTrabajador:number,id_equipo:number,updateAct:Actividad){
  return this.http.put(`${this.API_URI}/actividad/${id}/${nrc}/${noTrabajador}/${id_equipo}`,updateAct);
}
actualizarActEqAl(id:string,nrc:number,noTrabajador:number,id_equipo:number,matricula:number,updateAct:Actividad){
  return this.http.put(`${this.API_URI}/actividad/${id}/${nrc}/${noTrabajador}/${id_equipo}/${matricula}`,updateAct);
}
deleteActividad(id:string,nrc:number,noTrabajador:number){
  return this.http.delete(`${this.API_URI}/actividad/${id}/${nrc}/${noTrabajador}`);
}
deleteActividadEqs(id_equipo:number,nrc:number,noTrabajador:number){
  return this.http.delete(`${this.API_URI}/comodin/${id_equipo}/${nrc}/${noTrabajador}`);
}
deleteActividadEq(id:string,nrc:number,id_equipo:number,noTrabajador:number){
  return this.http.delete(`${this.API_URI}/actividad/${id}/${nrc}/${id_equipo}/${noTrabajador}`);
}
/////////FUNCIONES AVISO///////////////////////////////////////////////////////////////////////////
getAviso(nrc:number, noTrabajador:number){
  return this.http.get(`${this.API_URI}/aviso/${nrc}/${noTrabajador}`);
}
getAvisoEq(nrc:number, noTrabajador:number){
  return this.http.get(`${this.API_URI}/comodin2/${nrc}/${noTrabajador}`);
}
getAvisoEqAl(nrc:number, noTrabajador:number,id_equipo:number){
  return this.http.get(`${this.API_URI}/comodin2/${nrc}/${noTrabajador}/${id_equipo}`);
}
deleteAviso(id:string,nrc:number,noTrabajador:number){
  return this.http.delete(`${this.API_URI}/aviso/${id}/${nrc}/${noTrabajador}`);
}
deleteAvisoEq(id:string,nrc:number,id_equipo:number,noTrabajador:number){
  return this.http.delete(`${this.API_URI}/aviso/${id}/${nrc}/${id_equipo}/${noTrabajador}`);
}
getOneAviso(id:string,nrc:number,noTrabajador:number){
  return this.http.get(`${this.API_URI}/aviso/${id}/${nrc}/${noTrabajador}`);
}
getOneAvisoEq(id:string, nrc:number, id_equipo:number, noTrabajador:number){
  return this.http.get(`${this.API_URI}/aviso/${id}/${nrc}/${id_equipo}/${noTrabajador}`);
}
saveAviso(aviso: Aviso){
  return this.http.post(`${this.API_URI}/aviso/`,aviso);
}
actualizarAv(id:string,nrc:number,noTrabajador:number,updateAv:Aviso){
  return this.http.put(`${this.API_URI}/aviso/${id}/${nrc}/${noTrabajador}`,updateAv);
}
actualizarAvEq(id:string,nrc:number,noTrabajador:number,id_equipo:number,updateAv:Aviso){
  return this.http.put(`${this.API_URI}/aviso/${id}/${nrc}/${noTrabajador}/${id_equipo}`,updateAv);
}

//////////////// Funciones chat///////////////////////////////////////////////////////

saveChat(chat: Chat){
  return this.http.post(`${this.API_URI}/chat/`,chat);
}
obtenerMsjsCurso(nrc:number,noTrabajador:number){
  return this.http.get(`${this.API_URI}/chat/${nrc}/${noTrabajador}`);
}

obtenerMsjsCursoEquipo(nrc:number,id_equipo:number,noTrabajador:number){
  return this.http.get(`${this.API_URI}/chat/${nrc}/${id_equipo}/${noTrabajador}`);
}

// administrador ///////////////////////////////////////////////////////////////////////////////////////////////////////
  getAdmis() {
    return this.http.get(`${this.API_URI}/admi`);
  }
  // Funciones  Login /////////////////////////////////////////////////////////////////////////////////////////////
  getOneAdmi(id:string) {
    return this.http.get(`${this.API_URI}/login/${id}`);
  }
  //----------------------------Funciones Student////////////////////////////////////////////////////////////////////////////////////
  getStudents() {
    return this.http.get(`${this.API_URI}/student`);
  }
  saveStudent(student: Student){
    return this.http.post(`${this.API_URI}/student/`,student);
  }
  deleteAllStudents(){
    return this.http.delete(`${this.API_URI}/student`);
  }
  getStudent(matricula: number ){
    return this.http.get(`${this.API_URI}/student/${matricula}`);
  }
  deleteStudent(matricula: number){
    return this.http.delete(`${this.API_URI}/student/${matricula}`);
  }
  updateStudent(matricula: number, updateStudent: Student):Observable<Student> {
    return this.http.put(`${this.API_URI}/student/${matricula}`, updateStudent);
  }
  // ---------------------Funciones profs ////////////////////////////////////////////////////////////////////////////
  getProfs(){
    return this.http.get(`${this.API_URI}/prof`);
  }
  saveProf(prof: Prof){
    return this.http.post(`${this.API_URI}/prof/`,prof);
  }
  deleteAllProfs(){
    return this.http.delete(`${this.API_URI}/prof`);
  }
  getProf(nTrabajador: number){
    return this.http.get(`${this.API_URI}/prof/${nTrabajador}`);
  }
  deleteProf(nTrabajador: number){
    return this.http.delete(`${this.API_URI}/prof/${nTrabajador}`);
  }
  updateProf(nTrabajador, updateProf){
    return this.http.put(`${this.API_URI}/prof/${nTrabajador}`, updateProf);
  }
  // Funciones curso desde profesor  /////////////////////////////////////////////////////////////////////////////////////////////
  getCourses() {
    return this.http.get(`${this.API_URI}/curso`);
  }
  deleteAllCourses(){
    return this.http.delete(`${this.API_URI}/curso`);
  }  
  getCourse(nrc:number) {
    return this.http.get(`${this.API_URI}/curso/${nrc}`);
  }
  deleteCourse(nrc: number){
    return this.http.delete(`${this.API_URI}/curso/${nrc}`);
  }
  saveCourse(course: Curso){
    return this.http.post(`${this.API_URI}/curso/`,course);
  }
  updateCourse(clave, updateCourse){
    return this.http.put(`${this.API_URI}/curso/${clave}`, updateCourse);
  }
  // Funciones profesor_curso /////////////////////////////////////////////////////////////////////
  
  getUSERNRC(nTabajador:number, nrc: number){//    
    return this.http.get(`${this.API_URI}/profCourse/${nTabajador}/${nrc}`);
  }
  getProfCourses() { //
    return this.http.get(`${this.API_URI}/profCourse`);
  }
  deleteProfCourse(nTrabajador:number, nrc: number){//
    return this.http.delete(`${this.API_URI}/profCourse/${nTrabajador}/${nrc}`);
  }
  deleteAllProfCourse(){//
    return this.http.delete(`${this.API_URI}/profCourse`);
  }  
  saveProfCourse(pCourse: ProfCourse){ //
    return this.http.post(`${this.API_URI}/profCourse/`,pCourse);
  }

  /////funciones ////////////////////////////////////////////////////////////////////////////////////////////
  
  saveEst(estudiante: Student ) {
    return this.http.post(`${this.API_URI}/student`, estudiante);
  }
  saveCurso(curso: Curso ) {
    return this.http.post(`${this.API_URI}/curso`, curso);
  }
  verifica(nrc:number){
    return this.http.get(`${this.API_URI}/curso/${nrc}`)
  }
  

  //////////////////////////////Funciones para eliminar curso, profesor, estudiante/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  eliminarChat(nrc:number, chat:Object ) {
    return this.http.post(`${this.API_URI}/chat/${nrc}`, chat);
  }
  eliminarAvisos(nrc:number, aviso:Object ) {
    return this.http.post(`${this.API_URI}/aviso/${nrc}`, aviso);
  }
  eliminarActividad(nrc:number, actividad:Object ){
    return this.http.post(`${this.API_URI}/actividad/${nrc}`, actividad);
  }
  eliminarEquipoEs(nrc:number, equipoEs:Object ){
    return this.http.post(`${this.API_URI}/equipoStudents/${nrc}`, equipoEs);
  }
  eliminarEquipo(nrc:number, equipo:Object ){
    return this.http.post(`${this.API_URI}/equipo/${nrc}`, equipo);
  }
  eliminarEstudianteCu(nrc:number, estudianteCu:Object ){
    return this.http.post(`${this.API_URI}/studCourse/${nrc}`, estudianteCu);
  }
  eliminarProfesorCu(nrc:number, profesorCu:Object ){
    return this.http.post(`${this.API_URI}/profCourse/${nrc}`, profesorCu);
  }
  eliminarCurso(nrc:number, curso:Object ){
    return this.http.post(`${this.API_URI}/curso/${nrc}`, curso);
  }
  eliminarEstudiante(nrc:number, estudiante:Object ){
    return this.http.post(`${this.API_URI}/student/${nrc}`, estudiante);
  }
  eliminarProfesores(nTrabajador:number, profesores:Object ){
    return this.http.post(`${this.API_URI}/prof/${nTrabajador}`, profesores);
  }

  ///////////////////////////////Eliminar curso de un profesor ///////////////////////////
  deleteAviCur(nrc:number,noTrabajador:number){
    return this.http.delete(`${this.API_URI}/aviso/${nrc}/${noTrabajador}`);
  }
  deleteChatCur(nrc:number,noTrabajador:number){
    return this.http.delete(`${this.API_URI}/chat/${nrc}/${noTrabajador}`);
  }
  deleteActividadCur(nrc:number,noTrabajador:number){
    return this.http.delete(`${this.API_URI}/actividad/${nrc}/${noTrabajador}`);
  }
  deleteEquipoEsCur(nrc: number, nTrabajador:number){
    return this.http.delete(`${this.API_URI}/equipoStudents/${nrc}/${nTrabajador}`);
  }
  // deleteAllEquipos(nrc: number, nTrabajador:number){
  //   return this.http.delete(`${this.API_URI}/equipo/${nrc}/${nTrabajador}`);
  // }
  // deleteAllStudCourse(nrc:number, nTrabajador:number){
  //   return this.http.delete(`${this.API_URI}/studCourse/${nrc}/${nTrabajador}`);
  // }  
  // deleteProfCourse(nTrabajador:number, nrc: number){//
  //   return this.http.delete(`${this.API_URI}/profCourse/${nTrabajador}/${nrc}`);
  // }

}
