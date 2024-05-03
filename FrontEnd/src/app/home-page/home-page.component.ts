import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor () {}

  utilisateur : any
  ngOnInit(){
    let data = localStorage.getItem("user")
    if(data) {
      this.utilisateur = JSON.parse(data)
    }
  }
}
