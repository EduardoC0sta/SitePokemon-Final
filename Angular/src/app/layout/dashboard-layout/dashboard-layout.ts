import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardHeader } from '../dashboard-header/dashboard-header';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, DashboardHeader ],
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.css']
})
export class DashboardLayout { }
