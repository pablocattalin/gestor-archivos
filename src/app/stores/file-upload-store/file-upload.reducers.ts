import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { UploadStatus } from './file-upload';
import { uploadCancelAction, uploadCompletedAction, uploadFailureAction, uploadProgressAction, uploadRequestAction, uploadResetAction, uploadStartedAction } from './file-upload.actions';

export interface State {
  status: UploadStatus;
  error: string | null;
  progress: number | null;
}

export const initialState: State = {
  status: UploadStatus.Ready,
  error: null,
  progress: 0
};


export const feature = createFeature({
  name: 'upload-files',
  reducer: createReducer(
    initialState,
    on(uploadRequestAction, (state) => ({
      ...state,
      status: UploadStatus.Requested,
      progress: null,
      error: null
    })),
    on(uploadCancelAction, (state) => ({
      ...state,
      status: UploadStatus.Ready,
      progress: null,
      error: null
    })),
    on(uploadResetAction, (state) => ({
      ...state,
      status: UploadStatus.Ready,
      progress: null,
      error: null
    })),
    on(uploadFailureAction, (state, {error}) => ({
        ...state,
        status: UploadStatus.Failed,
        error: error,
        progress: null
    })),
    on(uploadStartedAction, (state) => ({
      ...state,
      status: UploadStatus.Started,
      progress: 0
    })),
    on(uploadProgressAction, (state, {progress}) => ({
      ...state,
      progress: progress
    })),
    on(uploadCompletedAction, (state) => ({
      ...state,
      status: UploadStatus.Completed,
      progress: 100,
      error: null
    })),
  ),
  extraSelectors: ({selectStatus, selectProgress}) => ({
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
    selectProgress
  }),
})
