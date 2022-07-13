import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student } from '../models/Student';
import { Prof }  from '../models/Prof';
import { Curso } from '../models/Curso';
import { Login }  from '../models/Login';
import { ProfCourse } from '../models/ProfCourse';
import { StudCourse } from '../models/StudCourse';
import { Equipo } from '../models/Equipo';

import { Observable } from 'rxjs';
import { cursoEstudiante } from '../models/cursoEstudiante';
import { Actividad } from '../models/Actividad';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  //---------- funciones sStudent course---------------------------------------------------
  getOneCursoEst(nrc:number, nTrabajador:number, matricula:number) {
    return this.http.get(`${this.API_URI}/studCourse/${nrc}/${nTrabajador}/${matricula}`);
  }
  crearCursoEst(subirEst:cursoEstudiante){
    return this.http.post(`${this.API_URI}/studCourse`, subirEst);
  }
  getStudCourse() {
    return this.http.get(`${this.API_URI}/studCourse`);
  }
  deleteStudCourse(matricula: number, nrc:number){
    return this.http.delete(`${this.API_URI}/studCourse/${matricula}/${nrc}`);
  }
  deleteAllStudCourse(){
    return this.http.delete(`${this.API_URI}/studCourse`);
  }  
  updateStudCourse(matricula: number, updateStudent: Student):Observable<Student> {
    return this.http.put(`${this.API_URI}/studCourse/${matricula}`, updateStudent);
  }

//Funciones equipo////////////////////////////////////////////////////////////////////////////////////
getEquipos() {
  return this.http.get(`${this.API_URI}/equipo`);
}
getOneEquipo(id: number ){
  return this.http.get(`${this.API_URI}/equipo/${id}`);
}
getOneEquipoN(id:number, nombre: string ){
  return this.http.get(`${this.API_URI}/equipo/${id}/${nombre}`);
}
saveEquipo(equipo: Equipo){
  return this.http.post(`${this.API_URI}/equipo/`,equipo);
}
deleteAllEquipo(){
  return this.http.delete(`${this.API_URI}/equipo`);
}
deleteEquipo(id: number){
  return this.http.delete(`${this.API_URI}/equipo/${id}`);
}
updateEquipo(matricula: number, updateStudent: Student):Observable<Student> {
  return this.http.put(`${this.API_URI}/equipo/${matricula}`, updateStudent);
}

///FUNCIONES ACTIVIDAD/////////////////////////////////
getOneActividad(id:string){
  return this.http.get(`${this.API_URI}/actividad/${id}`);
}

saveActividad(actividad: Actividad){
  return this.http.post(`${this.API_URI}/actividad/`,actividad);
}
// administrador ///////////////////////////////////////////////////////////////////////////////////////////////////////
  getAdmis() {
    return this.http.get(`${this.API_URI}/admi`);
  }
  // Funciones  Login /////////////////////////////////////////////////////////////////////////////////////////////
  getOneAdmi(id:string) {
    return this.http.get(`${this.API_URI}/login/${id}`);
  }
  //Funciones Student////////////////////////////////////////////////////////////////////////////////////
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
  // Funciones profs ////////////////////////////////////////////////////////////////////////////
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
  // Funciones curso  /////////////////////////////////////////////////////////////////////////////////////////////
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
  getProfCourses() {
    return this.http.get(`${this.API_URI}/profCourse`);
  }
  getProfCourse(nTrabajador: number) {
    return this.http.get(`${this.API_URI}/profCourse/${nTrabajador}`);
  }
  getNrcCourse(nrc:number) {
    return this.http.get(`${this.API_URI}/profCourse/${nrc}`);
  }  
  getOneNrcCourse(nrc:number) {
    return this.http.get(`${this.API_URI}/curso/${nrc}`);
  }
  getNRCCourse(nrc:number) {
    return this.http.get(`${this.API_URI}/profCourse/${nrc}`);
  }
  deleteProfCourse(nrc: number){
    return this.http.delete(`${this.API_URI}/profCourse/${nrc}`);
  }
  deleteAllProfCourse(){
    return this.http.delete(`${this.API_URI}/profCourse`);
  }  
  saveProfCourse(pCourse: ProfCourse){
    return this.http.post(`${this.API_URI}/profCourse/`,pCourse);
  }
  updateProfCourse(nrc, updateProfCourse){
    return this.http.put(`${this.API_URI}/profCourse/${nrc}`, updateProfCourse);
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
  

}
