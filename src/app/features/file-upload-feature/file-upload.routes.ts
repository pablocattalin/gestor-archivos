import { Route } from "@angular/router";
import { FileUploadEffects } from "../../stores/file-upload-store/file-upload.effects";
import { provideState } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { feature } from "../../stores/file-upload-store/file-upload.reducers";
import { FileUploadLoaderComponent } from "./containers/file-upload-loader/file-upload-loader.component";

export const filesUploadRoutes: Route[] = [
    {
      path: '',
      children: [
        { path: '', component: FileUploadLoaderComponent, title: 'File upload' },
      ],
      providers: [
        provideState(feature),
        provideEffects(FileUploadEffects),
      ],
    },
  ];
