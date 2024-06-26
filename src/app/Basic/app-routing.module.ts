import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePaths } from '../Settings/RoutePaths';
import { HomeComponent } from '../Components/home/home.component';
import { UserDetailsComponent } from '../Components/user-details/user-details.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', redirectTo: RoutePaths.home.UserList, pathMatch: 'full'
  },
  {
    path: RoutePaths.home.UserList,
    component: HomeComponent
  },
  {
    path: RoutePaths.home.UserDetails,
    component: UserDetailsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
