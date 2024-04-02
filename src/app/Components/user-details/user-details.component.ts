import { Component, OnInit } from '@angular/core';
import { IUserDetails } from '../../Models/i-users';
import { HttpService } from '../../Services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEndPoints } from '../../Settings/HttpEndPoints';
import { RoutePaths } from '../../Settings/RoutePaths';
import { DataService } from '../../Services/data.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {

  isLoaded: boolean = false;
  userDetials!: IUserDetails
  userId!: number

  isDataFound: boolean = true

  constructor(
    private _HttpService: HttpService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _DataService: DataService,
    private _ToastrService: ToastrService,
    private _SpinnerService: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.userId = this._ActivatedRoute.snapshot.params['id']
    this.GetUserDetails(this.userId)

    this._DataService.isDataChange.subscribe((isChanged) => {
      if (isChanged == true) {
        this._DataService.getData().subscribe((res: any) => {
          if (res != null && res != '') {
            this.GetUserDetails(res)
          } else {
            this.BackToListPage()
          }
        })
      }
    })



  }

  GetUserDetails(id: number) {
    if (id) {
      this._SpinnerService.show()
      let httpEndPoint = HttpEndPoints.user.getUserById
      httpEndPoint = httpEndPoint.replace('{id}', String(id))
      const cachedData = this._HttpService.GetDataById(id, httpEndPoint).subscribe((res) => {
        this.userDetials = res;
        this.isLoaded = true
        this.isDataFound = true
        this._SpinnerService.hide();
      }, (err: HttpErrorResponse) => {
        this._ToastrService.error('No Data Found')
        this.isDataFound = false
        this._SpinnerService.hide();
      })
    }
  }

  BackToListPage() {
    this._Router.navigateByUrl(RoutePaths.home.UserList)
  }

}
