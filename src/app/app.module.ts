import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { HomePublicComponent } from './home-public/home-public/home-public.component';
import { HomePrivateComponent } from './views/home-private/home-private/home-private.component';
import { PedidoComponent } from './views/pedido/pedido/pedido.component';
import { ErrorPageComponent } from './views/error-page/error-page/error-page.component';
import { HeaderComponent } from './shared/header/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './views/login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { RegisterComponent } from './views/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMedComponent } from './views/add-med/add-med.component';
import { AllMedsComponent } from './views/all-meds/all-meds.component';
import { EditMedComponent } from './views/edit-med/edit-med.component';
import { NewOrderComponent } from './views/new-order/new-order.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePublicComponent,
    HomePrivateComponent,
    PedidoComponent,
    ErrorPageComponent,
    LoginComponent,
    RegisterComponent,
    AddMedComponent,
    AllMedsComponent,
    EditMedComponent,
    NewOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
