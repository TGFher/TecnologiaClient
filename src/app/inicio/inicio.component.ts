import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private keycloakService: KeycloakService) {}

  login() {
    this.keycloakService.login();
  }

  register() {
    this.keycloakService.register();
  }
}
