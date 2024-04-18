import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, takeUntil } from 'rxjs/operators';
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
            concatMap(({file}) => this.fileUploadService.uploadFileTest(file).pipe(
                takeUntil(
                    this.actions$.pipe(ofType(ActionTypes.UPLOAD_CANCEL))
                ),
                map(event => this.getActionFromHttpEvent(event)),
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
        return uploadStartedAction();
      }
      case HttpEventType.UploadProgress: {
        return uploadProgressAction({
          progress: Math.round((100 * event.loaded) / event.total)
        });
      }
      case HttpEventType.ResponseHeader:
      case HttpEventType.Response: {
        if (event.status === 200) {
          return uploadCompletedAction();
        } else {
          return uploadFailureAction({
            error: event.statusText
          });
        }
      }
      default: {
        return uploadFailureAction({
          error: `${JSON.stringify(event)}`
        });
      }
    }
  }

  private handleError(error: any) {
    const errorMessage = serializeError.serializeError(error).message;
    return uploadFailureAction({
      error: errorMessage
    });
  }
}
