import { Component } from '@angular/core';
import { TecnologiaService } from '../tecnologia.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrl: './sistema.component.css'
})
export class SistemaComponent {

  tecnologia: any[] = [];

  nuevaTecnologia = {
    nombre: '',
    categoria: '',
  };

  constructor(
    private keycloakService: KeycloakService,
    private tenologiaService: TecnologiaService
  ) {}

  ngOnInit(): void {
    this.cargarTenologias();
  }

  async cargarTenologias() {
    try {
      const observable = await this.tenologiaService.getDispositivos();
      observable.subscribe(
        (response) => {

          if (response.success) {

            this.tecnologia = response.data;
            console.log('Tecnologias recibidas:', this.tecnologia);

          } else {

            console.error('Error en la respuesta:', response.message);

          }
        },
        (error) => {

          console.error('Error al obtener las tecnologias:', error);

        }
      );
    } catch (error) {

      console.error('Error al cargar las tecnologias:', error);

    }
  }

  async agregarTenologia() {
    try {
      const observable = await this.tenologiaService.createDispositivo(this.nuevaTecnologia);
      observable.subscribe(
        (response) => {
          if (response.success) {
            console.log(response.message);
            this.cargarTenologias();
          } else {
            console.error('Error en la respuesta:', response.message);
          }
        },
        (error) => {
          console.error('Error al agregar el dispositivo:', error);
        }
      );
    } catch (error) {
      console.error('Error al agregar el dispositivo:', error);
    }
  }

  logout() {
    this.keycloakService.logout();
  }

}
