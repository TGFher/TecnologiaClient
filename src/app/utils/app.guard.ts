
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard implements CanActivate {
  constructor(
    protected override router: Router,
    protected override keycloakAngular: KeycloakService
  ) {
    super(router, keycloakAngular);
  }

  public async isAccessAllowed(): Promise<boolean> {

    console.log('AuthGuard: Checking access');

    if (!this.authenticated) {

      console.log('User not authenticated. Redirecting to login.');

      await this.keycloakAngular.login({
        redirectUri: window.location.origin + '/sistema',
      });
      return false;
    }

    console.log('User authenticated.');
    return true;
  }

}
