import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { Pages } from './pages/pages';

const pages = Pages.map(page => {
  if (page.public) {
    return { path: page.route.substring(1), component: page.component }
  }
  return { path: page.route.substring(1), component: page.component, canActivate: [AuthGuard] }
});

const routes: Routes = [
  ...pages,
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
