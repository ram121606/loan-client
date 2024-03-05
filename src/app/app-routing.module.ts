import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KYCComponent } from './kyc/kyc.component';
import { AdminComponent } from './admin/admin.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'dashboard/:role', component: DashboardComponent},
  {path: 'kyc/:username', component: KYCComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'loan', component: LoanDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
