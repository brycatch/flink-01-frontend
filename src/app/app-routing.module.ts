import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTING } from './app.routes';

@NgModule({
  imports: [ROUTING],
  exports: [RouterModule]
})
export class AppRoutingModule { }
