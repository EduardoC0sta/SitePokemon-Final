// ATUALIZADO: Imports adicionados/modificados
import { Component, OnInit, Input, ElementRef, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit, AfterViewInit {
  @Input() isSticky: boolean = true;

  loginForm!: FormGroup;
  loginSubmitted = false;
  isLoggedIn$ = this.authService.usuarioLogado$;
  usuario: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$.subscribe(user => this.usuario = user);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }
  
  ngAfterViewInit(): void {
    // Este código só vai rodar se estiver no navegador.
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', this.clickout.bind(this));
    }
  }

  clickout(event: Event): void {
    if (isPlatformBrowser(this.platformId)) {
      const target = event.target as HTMLElement;
      if (!this.el.nativeElement.contains(target)) {
        const mobileMenu = document.getElementById('mobileNavContent');
        if (mobileMenu && mobileMenu.classList.contains('show')) {
          
          import('bootstrap').then(({ Collapse }) => {
            const bsCollapse = Collapse.getInstance(mobileMenu) || new Collapse(mobileMenu);
            bsCollapse.hide();
          });

        }
      }
    }
  }

  get lf() { return this.loginForm.controls; }

  onLoginSubmit(): void {
    this.loginSubmitted = true;
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
      },
      error: (err) => {
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}