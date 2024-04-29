import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './header/header.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    { path: 'login_page', component:LoginPageComponent },
    { path: 'header', component:HeaderComponent },
    { path: 'inscription', component:InscriptionComponent },
    { path: 'forget_password', component:ForgetPasswordComponent },
    { path: 'home_page', component:HomePageComponent},
    

    {
      path:'',
      redirectTo:'login_page',
      pathMatch:'full'
    }
];
