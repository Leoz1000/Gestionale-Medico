import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarComponent } from './Components/calendar/calendar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PatientComponent } from './pages/patient/patient.component';
import { TeamComponent } from './pages/team/team.component';
import { RequestPatientComponent } from './pages/request-patient/request-patient.component';
import { AnamesiComponent } from './Components/anamesi/anamesi.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { UserService } from './_services/user.service';
import { StorageService } from './_services/storage.service';
import { ClientService } from './_services/client.service';
import { AuthService } from './_services/auth.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    PatientComponent,
    TeamComponent,
    RequestPatientComponent,
    AnamesiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, // import FullCalendar
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzTableModule,
    NzModalModule,
    NzInputModule,
    NzCardModule,
    NzDropDownModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzGridModule,
    NzCascaderModule,
    NzSelectModule,
    NzTabsModule,
    NzTypographyModule,
    NzTimelineModule,
    NzDatePickerModule,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: NZ_I18N, useValue: en_US },
    UserService,
    StorageService,
    ClientService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
