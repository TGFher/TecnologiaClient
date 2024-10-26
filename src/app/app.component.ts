import {Component, OnInit} from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'TecnologiaClient';

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  async ngOnInit() {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    if (isLoggedIn) {
      // Verifica si ya estás en /dashboard, si no, redirige
      if (this.router.url === '/') {
        this.router.navigate(['/sistema']);
      }
    }
  }
}
