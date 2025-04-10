import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, UserLogin, UserRegister } from '../models/user.model';
import { Router } from '@angular/router';

/**
 * Service d'authentification gérant la connexion, l'inscription et la gestion des utilisateurs
 * @class AuthService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenKey = 'auth_token';

  /**
   * Crée une instance du service d'authentification
   * @param http - Service HTTP pour les appels API
   * @param router - Service de routage Angular
   */
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredUser();
  }

  /**
   * Obtient l'utilisateur actuellement connecté
   * @returns L'utilisateur connecté ou null
   */
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Charge l'utilisateur stocké dans le localStorage
   * @private
   */
  private loadStoredUser(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const user = this.parseJwt(token);
      this.currentUserSubject.next(user);
    }
  }

  /**
   * Décode le token JWT pour obtenir les informations de l'utilisateur
   * @param token - Token JWT à décoder
   * @returns Les informations de l'utilisateur décodées
   * @private
   */
  private parseJwt(token: string): User {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  /**
   * Authentifie un utilisateur
   * @param credentials - Identifiants de connexion
   * @returns Observable contenant la réponse du serveur avec le token et les informations utilisateur
   */
  login(credentials: UserLogin): Observable<any> {
    return this.http.post<{token: string, user: User}>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  /**
   * Inscrit un nouvel utilisateur
   * @param userData - Données d'inscription de l'utilisateur
   * @returns Observable contenant la réponse du serveur avec le token et les informations utilisateur
   */
  register(userData: UserRegister): Observable<any> {
    return this.http.post<{token: string, user: User}>(`${this.API_URL}/register`, userData)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  /**
   * Déconnecte l'utilisateur et redirige vers la page de connexion
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Vérifie si un utilisateur est connecté
   * @returns true si un utilisateur est connecté, false sinon
   */
  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  /**
   * Récupère le token d'authentification stocké
   * @returns Le token d'authentification ou null
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Vérifie si l'utilisateur connecté est un administrateur
   * @returns true si l'utilisateur est un administrateur, false sinon
   */
  isAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.role === 'ADMIN';
  }

  /**
   * Récupère l'utilisateur actuellement connecté
   * @returns L'utilisateur connecté ou null
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
