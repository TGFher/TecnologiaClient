import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

import { AuthGuard } from './app.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;

  beforeEach(() => {
    const keycloakServiceMock = jasmine.createSpyObj('KeycloakService', [
      'login',
      'isLoggedIn',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy },
        { provide: KeycloakService, useValue: keycloakServiceMock },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    keycloakServiceSpy = TestBed.inject(
      KeycloakService
    ) as jasmine.SpyObj<KeycloakService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

});
