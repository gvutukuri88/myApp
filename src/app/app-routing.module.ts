import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardserviceService } from './authguardservice.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path : 'signup' ,component : LoginComponent},
  {path: 'dashboard' , component :DashboardComponent , canActivate :[AuthguardserviceService]},
  {path: 'signin' , component :SigninComponent},
  {path:'*' ,redirectTo:'signup' ,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
