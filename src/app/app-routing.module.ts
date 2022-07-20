import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./resource-list/resource-list.module').then(m => m.ResourceListModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./resource-detail/resource-detail.module').then(m => m.ResourceDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
