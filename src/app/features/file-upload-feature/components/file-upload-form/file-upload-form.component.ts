import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-file-upload-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './file-upload-form.component.html',
  styleUrl: './file-upload-form.component.scss'
})
export class FileUploadFormComponent implements OnInit, OnChanges {

  @Input() completed: boolean | null = false;
  @Input() progress: number | null = 0;
  @Input() error: string | null = null;
  @Input() isInProgress: boolean | null = false;
  @Input() isReady!: boolean | null;
  @Input() hasFailed!: boolean | null;

  @Output() uploadRequest = new EventEmitter<File>();
  @Output() uploadReset = new EventEmitter();
  @Output() uploadCancel = new EventEmitter();



  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  uploadFile(event: any): void {
    const files: FileList = event.target.files;
    const file: File | null = files.item(0);

    if (file) {
      this.uploadRequest.emit(file);
      //Lipiar input
      event.srcElement.value = null;
    }
  }

  resetUpload(): void {
    this.uploadReset.emit();
  }

  cancelUpload() {
    this.uploadCancel.emit();
  }
}
