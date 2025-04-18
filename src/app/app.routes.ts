import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./posts/post-list/post-list.component').then(m => m.PostListComponent),
    },
    {
        path: 'create',
        loadComponent: () => import('./posts/post-create/post-create.component').then(m => m.PostCreateComponent),
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./posts/post-create/post-create.component').then(m => m.PostCreateComponent),
    }
];
