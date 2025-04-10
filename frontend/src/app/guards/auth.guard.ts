import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard qui protège les routes nécessitant une authentification
 * @class AuthGuard
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Crée une instance du guard d'authentification
   * @param authService - Service d'authentification pour vérifier l'état de connexion
   * @param router - Service de routage pour la redirection
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Vérifie si l'utilisateur est authentifié avant d'autoriser l'accès à une route
   * @returns true si l'utilisateur est authentifié, false sinon
   */
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}
