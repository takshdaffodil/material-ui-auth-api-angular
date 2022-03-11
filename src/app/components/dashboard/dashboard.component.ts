import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userDataObs$ = this.store.select((state) => state.auth?.userData);

  constructor(
    public authService: AuthService,
    public store: Store<{ auth: any }>
  ) {}

  ngOnInit(): void {}
}
