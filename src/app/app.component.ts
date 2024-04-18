import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileUploadLoaderComponent } from './features/file-upload-feature/containers/file-upload-loader/file-upload-loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileUploadLoaderComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
