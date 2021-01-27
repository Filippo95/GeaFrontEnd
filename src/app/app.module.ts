import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { BasicAuthInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { TemperatureComponent } from './temperature/temperature.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { UmiditaComponent } from './umidita/umidita.component';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    FormsModule
  ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent
,
        TemperatureComponent ,
        UmiditaComponent ,
        SwitchComponent  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
