import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  constructor(private authService: AuthServiceService, private router: Router) { }

  user: any = {
    email: "",
    password: ""
  }

  connexionDown: boolean = true

  connexion() {
    let infoUser
    this.authService.connexion(this.user).subscribe((data) => {
      infoUser = data.user
      infoUser = JSON.stringify(infoUser)
      localStorage.setItem("user", infoUser)
      console.log(infoUser)
      this.router.navigate(['/home_page'])
    },
      (error) => {
        this.connexionDown = false
      })

  }
}
