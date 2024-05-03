import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  constructor(private authService: AuthServiceService, private router: Router) {}

  utilisateur : any = {
    mail: null,
    password : null
  }

  modifiedPassword : boolean =true
  isPassword : boolean = true
  resetPassword(){
    this.isPassword = Object.values(this.utilisateur).every(valeur => !!valeur);

    if(this.isPassword) {
      this.authService.resetPassword(this.utilisateur).subscribe((error) => {
        this.modifiedPassword = false
      }, (data) => {
        this.router.navigate(['/login_page'])
      })
    }

  }
}
