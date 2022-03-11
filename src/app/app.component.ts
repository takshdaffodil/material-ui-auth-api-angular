import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'api-authentication';
  userLoggedIn = false;
  isAuthenticated$ = this.store.select((state) => state.auth?.isAuthenticated);

  constructor(
    public authService: AuthService,
    public store: Store<{ auth: any }>
  ) {}
}
