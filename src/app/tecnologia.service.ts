import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {
  private apiUrl = 'http://127.0.0.1:8000/dispositivos';

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService
  ) { }

  async getDispositivos(): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/`, { headers });
  }

  async createDispositivo(vehiculo: any): Promise<Observable<any>> {
    const headers = await this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/nuevo`, vehiculo, { headers });
  }

  private async getHeaders(): Promise<HttpHeaders> {
    try {
      const token = await this.keycloakService.getToken();
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    } catch (error) {
      console.error('Error al obtener el token:', error);

      await this.keycloakService.login();
      throw error;
    }
  }

}
