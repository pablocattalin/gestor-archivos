import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, takeUntil } from 'rxjs/operators';
import * as serializeError from 'serialize-error';
import {
  ActionTypes, uploadCompletedAction, uploadFailureAction, uploadProgressAction, uploadRequestAction, uploadStartedAction
} from './file-upload.actions';
import { FileUploadService } from '../../services/file-upload.service';


@Injectable()
export class FileUploadEffects {

    readonly upload$ = createEffect(
        () => this.actions$.pipe(
            ofType(uploadRequestAction),
            concatMap(({file}) => this.fileUploadService.uploadFile(file).pipe(
                takeUntil(
                    this.actions$.pipe(ofType(ActionTypes.UPLOAD_CANCEL))
                ),
                mergeMap(event => {                      
                  return this.getActionFromHttpEvent(event)
                }),
                catchError(error => of(this.handleError(error)))
            ))
        )
    );


  constructor(
    private fileUploadService: FileUploadService,
    private actions$: Actions
  ) {}

  private getActionFromHttpEvent(event: HttpEvent<any> | any) {    
    switch (event.type) {
      case HttpEventType.Sent: {
        return [uploadStartedAction()];
      }
      case HttpEventType.UploadProgress: {
        return [uploadProgressAction({
          progress: Math.round((100 * event.loaded) / event.total)
        })];
      }
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event.status === 200) {
          
          if (event.body) {
            console.log(event);            
            this.createFile(event.body);
            return [uploadCompletedAction({
              info: {
                malwareName: event.body?.malwareName,
                rating: event.body?.rating,
                score: event.body?.score
              }
            })]
          } else {
            return [uploadCompletedAction({info: null})];
          }
        } else {
          return [uploadFailureAction({
            error: event.statusText
          })];
        }
      }
      default: {
        return [uploadFailureAction({
          error: `${JSON.stringify(event)}`
        })];
      }
    }
  }

  private handleError(error: any) {
    const errorMessage = serializeError.serializeError(error).message;
    return uploadFailureAction({
      error: errorMessage
    });
  }

  private createFile(body: any) {

        
    // Decodificar la cadena base64 a un arreglo de bytes
    const fileBytes = base64ToBytes(body.content);

    // Crear un Blob con los bytes decodificados
    const blob = new Blob([fileBytes], { type: 'application/octet-stream' });

    // Crear un URL de descarga
    const downloadUrl = window.URL.createObjectURL(blob);

    // Crear un elemento <a> para iniciar la descarga
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = body.filename; // Nombre del archivo que se descargará

    // Simular un clic en el enlace para iniciar la descarga
    a.click();

    // Limpiar recursos
    window.URL.revokeObjectURL(downloadUrl);
    
  }
  
  
}

function base64ToBytes(base64: string) {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}