import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {
  protected isVisible = false;

  private destroyed$ = new Subject<void>();
  constructor(private authSrv: AuthService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {}

  ngOnInit(): void {
    this.authSrv.currentUser$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(_ => {
        this.updateView();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private updateView() {
    if (this.authSrv.isLoggedIn()) {
      if (!this.isVisible) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      this.isVisible = true;
    } else {
      this.isVisible
      this.viewContainer.clear();
    }
  }

}
