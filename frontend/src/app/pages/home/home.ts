import { AuthService } from './../../services/auth-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(public authService:AuthService){

  }
  logout(){
    this.authService.logout();
  }
}
