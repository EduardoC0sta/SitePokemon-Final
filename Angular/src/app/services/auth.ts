import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AuthService {
  private apiUrl = 'http://localhost:3001';
  private usuarioLogadoSubject: BehaviorSubject<any | null>;
  public usuarioLogado$: Observable<any | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.usuarioLogadoSubject = new BehaviorSubject<any | null>(this.getUsuarioSalvo());
    this.usuarioLogado$ = this.usuarioLogadoSubject.asObservable();
  }

  cadastrar(dadosUsuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, dadosUsuario);
  }

  login(credenciais: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credenciais).pipe(
      tap(response => this.salvarSessao(response))
    );
  }

  private salvarSessao(response: any): void {
    if (isPlatformBrowser(this.platformId) && response?.token && response?.usuario) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
      this.usuarioLogadoSubject.next(response.usuario);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.usuarioLogadoSubject.next(null);
      this.router.navigate(['/home']);
    }
  }

  private getUsuarioSalvo(): any | null {
    if (isPlatformBrowser(this.platformId)) {
      const usuario = localStorage.getItem('usuario');
      return usuario ? JSON.parse(usuario) : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  isAdmin(): boolean {
    const usuario = this.getUsuarioSalvo();
    return usuario && usuario.role === 'admin';
  }
}
