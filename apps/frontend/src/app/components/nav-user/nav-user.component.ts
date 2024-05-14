import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavUserComponent {

  @Input()
  user: User | null = null;

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('logout')
  logoutEvent = new EventEmitter<void>();

  logout() {
    this.logoutEvent.emit();
  }
}
