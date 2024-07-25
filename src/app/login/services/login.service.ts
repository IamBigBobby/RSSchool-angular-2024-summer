import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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

  // eslint-disable-next-line class-methods-use-this
  public isLoggedIn(): boolean {
    return !!localStorage.getItem("IamBigBobby_youtubeService");
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
