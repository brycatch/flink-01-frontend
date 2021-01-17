import { Routes, RouterModule } from '@angular/router';

// Components
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const ROUTES: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'list', component: ListComponent },
];

export const ROUTING = RouterModule.forRoot(ROUTES, {});
