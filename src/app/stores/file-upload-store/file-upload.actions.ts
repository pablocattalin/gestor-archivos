import { Action, props, createAction } from '@ngrx/store';

export enum ActionTypes {
  UPLOAD_REQUEST = '[File Upload] Request',
  UPLOAD_CANCEL = '[File Upload] Cancel',
  UPLOAD_RESET = '[File Upload] Reset',
  UPLOAD_STARTED = '[File Upload API] Started',
  UPLOAD_PROGRESS = '[File Upload API] Progress',
  UPLOAD_FAILURE = '[File Upload API] Failure',
  UPLOAD_COMPLETED = '[File Upload API] Completed'
}

export const uploadRequestAction = createAction(
  ActionTypes.UPLOAD_REQUEST,
  props<{ file: File }>()
);

export const uploadCancelAction = createAction(
  ActionTypes.UPLOAD_CANCEL,  
);

export const uploadResetAction = createAction(
  ActionTypes.UPLOAD_RESET,  
);

export const uploadStartedAction = createAction(
  ActionTypes.UPLOAD_STARTED,  
);

export const uploadProgressAction = createAction(
  ActionTypes.UPLOAD_PROGRESS,  
  props<{ progress: number }>()
);

export const uploadFailureAction = createAction(
  ActionTypes.UPLOAD_FAILURE,  
  props<{ error: string }>()
);

export const uploadCompletedAction = createAction(
  ActionTypes.UPLOAD_COMPLETED,  
);
