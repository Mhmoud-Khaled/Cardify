import { Component } from '@angular/core';
import { RoutePaths } from '../../Settings/RoutePaths';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {

  constructor(private _Router: Router) { }

  BackToListPage() {
    this._Router.navigateByUrl(RoutePaths.home.UserList)  // return to  User List Page
  }

}
