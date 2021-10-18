import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

import { AuthService } from './../../core/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  usuarioLogado: any = {};

  constructor(
    private observer: BreakpointObserver,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getDecodeToken();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }

}
