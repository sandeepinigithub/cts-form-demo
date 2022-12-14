import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { GenerateFormComponent } from './generate-form/generate-form.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'generate-form'
  },
  {
    path:'generate-form',
    component:GenerateFormComponent
  },
  {
    path:'form-preview',
    component:FormPreviewComponent
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
