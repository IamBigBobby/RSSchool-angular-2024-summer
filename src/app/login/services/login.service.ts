import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
  ) {}

  public login() {
    localStorage.setItem(
      'IamBigBobby_youtubeService',
      this.generateRandomToken(),
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public logout() {
    localStorage.removeItem('IamBigBobby_youtubeService');
  }

  public isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('IamBigBobby_youtubeService')) {
        return true;
      }
    }
    this.router.navigate(['/login-page']);
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
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
