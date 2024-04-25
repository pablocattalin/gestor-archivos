import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private API_BASE_URL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient,
    private router: Router) {}

  public uploadFile(file: File): Observable<HttpEvent<{}>> {    
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(file);    

    const req = new HttpRequest(
      'POST',
      `${this.API_BASE_URL}`,
      formData,
      {
        reportProgress: true,
        responseType: 'json' 
      }
    );
    return this.httpClient.request(req);
  }

  uploadFileTest(file: File): Observable<HttpEvent<{}>> {
    // Simular un evento de progreso
    const progressEvent: HttpEvent<{}> = {
      type: HttpEventType.UploadProgress,
      loaded: 50, // Por ejemplo, el 50% completado
      total: 100 // El tamaño total del archivo
    };

    // Simular la respuesta exitosa
    const successResponse: HttpResponse<{}> = new HttpResponse({
      body: {} // El cuerpo de la respuesta, en este caso, vacío
    });

    // Retornar un observable que emita un evento de progreso y luego una respuesta exitosa
    return new Observable(observer => {
      // Emitir el evento de progreso después de un pequeño retraso para simular el tiempo que tomaría cargar el archivo
      setTimeout(() => {
        observer.next(progressEvent);
      }, 1000);

      // Emitir la respuesta exitosa después de otro pequeño retraso
      setTimeout(() => {
        observer.next(successResponse);
        observer.complete(); // Completar el observable
      }, 2000);
    });
  }
}
