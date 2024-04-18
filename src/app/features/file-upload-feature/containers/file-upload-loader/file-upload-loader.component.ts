import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { State, feature } from '../../../../stores/file-upload-store/file-upload.reducers';
import * as actionsFileUpload from '../../../../stores/file-upload-store/file-upload.actions';
import { FileUploadFormComponent } from '../../components/file-upload-form/file-upload-form.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-file-upload-loader',
  standalone: true,
  imports: [
    FileUploadFormComponent,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './file-upload-loader.component.html',
  styleUrl: './file-upload-loader.component.scss'
})
export class FileUploadLoaderComponent implements OnInit {
  completed$!: Observable<boolean>;
  progress$!: Observable<number | null>;
  error$!: Observable<string | null>;
  isInProgress$!: Observable<boolean>;
  isReady$!: Observable<boolean>;
  hasFailed$!: Observable<boolean>;

  constructor(private store$: Store<State>) {}

  ngOnInit() {
    this.store$.pipe(select(feature.selectStatus)).subscribe(a => console.log('estado actual', a));
    this.completed$ = this.store$.pipe(select(feature.selectUploadFileCompleted));
    this.progress$ = this.store$.pipe(select(feature.selectProgress));
    this.error$ = this.store$.pipe(select(feature.selectError));
    this.isInProgress$ = this.store$.pipe(select(feature.selectUploadFileInProgress));
    this.isReady$ = this.store$.pipe(select(feature.selectUploadFileReady));
    this.hasFailed$ = this.store$.pipe(select(feature.selectUploadFileFailed));

    this.store$.pipe(select(feature.selectUploadFileInProgress)).subscribe(a => console.log(a));
  }

  uploadFile(file: File): void {
    this.store$.dispatch(
      actionsFileUpload.uploadRequestAction({
        file
      })
    );
  }

  resetUpload(): void {
    this.store$.dispatch(actionsFileUpload.uploadResetAction());
  }

  cancelUpload() {
    this.store$.dispatch(actionsFileUpload.uploadCancelAction());
  }
}
