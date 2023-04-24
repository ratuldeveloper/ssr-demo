import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SeoMetaService } from './seo-meta.service';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: {
      userData: SeoMetaService
    }

  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
