import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {

  constructor(private authService: AuthServiceService, private router: Router) { }

  utilisateur: any = {
    nom: null,
    prenom: null,
    mail: null,
    password: null,
    photo: null,
    cv: null
  }

  inscriptionDown : boolean = true

  onCvChange(event : any){
    this.utilisateur.cv = event.target.files[0]
  }

  onPhotoChange(event : any){
    this.utilisateur.photo = event.target.files[0]
  }
  inscription(){

    const valeurs = Object.values(this.utilisateur).every(valeur => !!valeur);

    if(valeurs) {
      const formData = new FormData();
      formData.append('nom', this.utilisateur.nom);
      formData.append('prenom', this.utilisateur.prenom);
      formData.append('mail', this.utilisateur.mail);
      formData.append('password', this.utilisateur.password);
      formData.append('photo', this.utilisateur.photo);
      formData.append('cv', this.utilisateur.cv);

      this.authService.inscription(formData).subscribe((data) =>{
        console.log(data)
        this.router.navigate(['/login_page'])
      })
    } else {
        this.inscriptionDown = false
    }

  }
}
