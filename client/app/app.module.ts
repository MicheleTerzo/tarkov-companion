import {NgModule}                            from '@angular/core';
import {BrowserModule}                       from '@angular/platform-browser';
import {AppRoutingModule}                    from './app-routing.module';
import {AppComponent}                        from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule}                         from '@angular/forms';
import {BrowserAnimationsModule}             from '@angular/platform-browser/animations';
import {HeaderComponent}                     from './components/header/header.component';
import {MessageService}                      from 'primeng/api';
import {ToastModule}                         from 'primeng/toast';
import {ErrorInterceptor}                    from './services/error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports     : [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HeaderComponent,
    ToastModule
  ],
  providers   : [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
