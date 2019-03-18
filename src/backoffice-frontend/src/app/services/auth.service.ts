import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  login(username: string, password: string) {
   if (username === 'demo' && password === 'demo') {
     const obj = {
       username: username,
       password: password,
     };

     localStorage.setItem('user', JSON.stringify(obj));
     this.router.navigate(['/' ]);
   } else {
     this.router.navigate(['/login' ]);
   }
  }

  logout() {
    localStorage.removeItem('user');
  }


  isLogged() {
    if (localStorage.getItem('obj')) {
      return true;
    }
    return false;
  }

}
