import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  currentYear!: number

  ngOnInit(): void {
    this.currentYear = this.getCurrentYear()
  }

  //get current year
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

}
