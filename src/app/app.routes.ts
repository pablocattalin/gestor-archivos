import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'files',
        loadChildren: () =>
          import('./features/file-upload-feature/file-upload.routes').then((m) => m.filesUploadRoutes),
    },
];
