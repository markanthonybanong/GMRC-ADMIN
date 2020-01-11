import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@gmrc-admin/shared/services';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  routeToInquiry(): void {
    this.router.navigate(['/inquiry']);
  }
  routeToRoom(): void {
    this.router.navigate(['/room']);
  }
  routeToTenant(): void {
    this.router.navigate(['/tenant']);
  }
  routeToPayment(): void {
    this.router.navigate(['/payment']);
  }
  routeToPrint(): void {
    this.router.navigate(['/print']);
  }
  routeToRoomAccount(): void {
    this.router.navigate(['/room-account']);
  }
  routeToPhoto(): void {
    this.router.navigate(['/photo']);
  }
  onLogOut(): void {
    this.authService.onLogOut();
  }

}
