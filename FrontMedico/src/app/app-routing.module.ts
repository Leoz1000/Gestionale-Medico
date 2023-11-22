import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuardGuard } from './_services/guard/auth-guard.guard';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { loginRegisterGuard } from './_services/guard/Login_Register.guard';
import { PatientComponent } from './pages/patient/patient.component';
import { TeamComponent } from './pages/team/team.component';
import { RequestPatientComponent } from './pages/request-patient/request-patient.component';
import { AnamesiComponent } from './Components/anamesi/anamesi.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent, canActivate: [authGuardGuard] },

  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'anamnesi/:id',
    component: AnamesiComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'patient',
    component: PatientComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'team',
    component: TeamComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'request',
    component: RequestPatientComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginRegisterGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuardGuard],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// FUNZIONE DA INSERIRE NEL COMPONENTE DI PARTENZA

// import { Router } from '@angular/router';
//   navigateToDestination() {
//     const dataToPass = { key: 'value' };

//     this.router.navigate(['/destination'], {
//       state: { data: dataToPass },
//     });
//   }

//FUNZIONE DA INSERIRE NEL COMPONENTE DI DESTINAZIONE

// import { ActivatedRoute } from '@angular/router';

//   constructor(private route: ActivatedRoute) {
//     const navigationState = history.state;

//     if (navigationState && navigationState.data) {
//       const receivedData = navigationState.data;
//       console.log(receivedData); // Puoi fare qualcosa con i dati ricevuti
//     }
//   }
