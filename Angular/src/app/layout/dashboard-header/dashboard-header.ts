import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-header.html',
  styleUrls: ['./dashboard-header.css']
})
export class DashboardHeader {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
