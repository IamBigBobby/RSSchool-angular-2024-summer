import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
  ) {}

  public login() {
    localStorage.setItem(
      'IamBigBobby_youtubeService',
      this.generateRandomToken(),
    );
  }

  public logout() {
    localStorage.removeItem('IamBigBobby_youtubeService');
  }

  public isLoggedIn(): boolean {
    console.log(this.platformId);
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('IamBigBobby_youtubeService')) {
        return true;
      }
    }
    this.router.navigate(['/login-page']);
    return false;
  }

  private generateRandomToken(): string {
    const length = 16;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  }
}
