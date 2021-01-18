import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';


import { DatePipe } from './pipes/date/date.pipe';
import { ShortTextPipe } from './pipes/short-text/short-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateComponent,
    ListComponent,
    WelcomeComponent,
    DatePipe,
    ShortTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
