import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from 'src/app/home/home.page';
import { CrearCursoPage } from './curso/crear-curso/crear-curso.page';


import { HomeProfPage } from './home-prof.page';
import { ConsultCoursePage } from './curso/consult-course/consult-course.page';
import { DeleteCoursePage } from './curso/delete-course/delete-course.page';

const routes: Routes = [
  {
    path: '',
    component: HomeProfPage
  },
  
  {
    path: 'generar-equipo',
    loadChildren: () => import('./equipo/generar-equipo/generar-equipo.module').then( m => m.GenerarEquipoPageModule)
  },
  {
    path: 'consultar-equipo',
    loadChildren: () => import('./equipo/consultar-equipo/consultar-equipo.module').then( m => m.ConsultarEquipoPageModule)
  },
  {
    path: 'modificar-equipo',
    loadChildren: () => import('./equipo/modificar-equipo/modificar-equipo.module').then( m => m.ModificarEquipoPageModule)
  },
  {
    path: 'eliminar-equipo',
    loadChildren: () => import('./equipo/eliminar-equipo/eliminar-equipo.module').then( m => m.EliminarEquipoPageModule)
  },
  {
    path: 'subir-estudiante',
    loadChildren: () => import('./estudiante/subir-estudiante/subir-estudiante.module').then( m => m.SubirEstudiantePageModule)
  },
  {
    path: 'consultar-estudiante',
    loadChildren: () => import('./estudiante/consultar-estudiante/consultar-estudiante.module').then( m => m.ConsultarEstudiantePageModule)
  },
  {
    path: 'eliminar-estudiante',
    loadChildren: () => import('./estudiante/eliminar-estudiante/eliminar-estudiante.module').then( m => m.EliminarEstudiantePageModule)
  },
  {
    path: 'alta-actividad',
    loadChildren: () => import('./actividades/alta-actividad/alta-actividad.module').then( m => m.AltaActividadPageModule)
  },
  {
    path: 'consultar-actividad',
    loadChildren: () => import('./actividades/consultar-actividad/consultar-actividad.module').then( m => m.ConsultarActividadPageModule)
  },
  {
    path: 'modificar-actividad',
    loadChildren: () => import('./actividades/modificar-actividad/modificar-actividad.module').then( m => m.ModificarActividadPageModule)
  },
  {
    path: 'eliminar-actividad',
    loadChildren: () => import('./actividades/eliminar-actividad/eliminar-actividad.module').then( m => m.EliminarActividadPageModule)
  },
  {
    path: 'evaluar-actividad',
    loadChildren: () => import('./actividades/evaluar-actividad/evaluar-actividad.module').then( m => m.EvaluarActividadPageModule)
  },
  {
    path: 'avisos',
    loadChildren: () => import('./comunicacion/avisos/avisos.module').then( m => m.AvisosPageModule)
  },
  {
    path:'home',
    component: HomePage
  },
  {
    path: 'menu-prof',
    loadChildren: () => import('./menu-prof/menu-prof.module').then( m => m.MenuProfPageModule)
  },
  {
   path: 'crear-curso/:user',
   component: CrearCursoPage 
  },
  {
    path: 'home-prof',
    component: HomeProfPage
  },
  {
    path: 'consult-course',
    loadChildren: () => import('./curso/consult-course/consult-course.module').then( m => m.ConsultCoursePageModule)
  },
  {
    path: 'consult-course/:user',
    component: ConsultCoursePage 
  },
  {
    path: 'create-course',
    loadChildren: () => import('./curso/create-course/create-course.module').then( m => m.CreateCoursePageModule)
  },
  {
    path: 'delete-course',
    loadChildren: () => import('./curso/delete-course/delete-course.module').then( m => m.DeleteCoursePageModule)
  },
  {
    path: 'delete-course/:user',
    component: DeleteCoursePage
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeProfPageRoutingModule {}
