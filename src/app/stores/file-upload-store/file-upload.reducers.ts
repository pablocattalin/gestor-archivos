import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { UploadStatus } from './file-upload';
import { uploadCancelAction, uploadCompletedAction, uploadFailureAction, uploadProgressAction, uploadRequestAction, uploadResetAction, uploadStartedAction } from './file-upload.actions';

export interface State {
  status: UploadStatus;
  error: string | null;
  progress: number | null;
  result: any | null;
}

export const initialState: State = {
  status: UploadStatus.Ready,
  error: null,
  progress: 0,
  result: null
};


export const feature = createFeature({
  name: 'upload-files',
  reducer: createReducer(
    initialState,
    on(uploadRequestAction, (state) => ({
      ...state,
      status: UploadStatus.Requested,
      progress: null,
      error: null,
      result: null
    })),
    on(uploadCancelAction, (state) => ({
      ...state,
      status: UploadStatus.Ready,
      progress: null,
      error: null,
      result: null
    })),
    on(uploadResetAction, (state) => ({
      ...state,
      status: UploadStatus.Ready,
      progress: null,
      error: null,
      result: null
    })),
    on(uploadFailureAction, (state, {error}) => ({
        ...state,
        status: UploadStatus.Failed,
        error: error,
        progress: null,
        result: null
    })),
    on(uploadStartedAction, (state) => ({
      ...state,
      status: UploadStatus.Started,
      progress: 0,
      result: null
    })),
    on(uploadProgressAction, (state, {progress}) => ({
      ...state,
      progress: progress,
      result: null
    })),
    on(uploadCompletedAction, (state, {info}) => ({
      ...state,
      status: UploadStatus.Completed,
      progress: 100,
      error: null,
      result: info
    })),
  ),
  extraSelectors: ({selectStatus, selectProgress, selectResult}) => ({
    selectUploadFileReady: createSelector(
      selectStatus,
      (status) => {
        return status === UploadStatus.Ready
      }
    ),
    selectUploadFileRequested: createSelector(
      selectStatus,
      (status) => status === UploadStatus.Requested
    ),
    selectUploadFileStarted: createSelector(
      selectStatus,
      (status) => status === UploadStatus.Started
    ),
    selectUploadFileInProgress: createSelector(
      selectStatus,
      selectProgress,
      (status, progress) => {
        return (status === UploadStatus.Requested || status === UploadStatus.Started) && (progress !== null && progress >= 0)
      }
    ),
    selectUploadFileFailed: createSelector(
      selectStatus,
      (status) => status === UploadStatus.Failed
    ),
    selectUploadFileCompleted: createSelector(
      selectStatus,
      (status) => status === UploadStatus.Completed
    ),
    selectStatus,
    selectProgress,
    selectResult
  }),
})
