import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Intercepteur HTTP qui ajoute automatiquement le token d'authentification aux requêtes
 * @class AuthInterceptor
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Crée une instance de l'intercepteur d'authentification
   * @param authService - Service d'authentification pour récupérer le token
   */
  constructor(private authService: AuthService) {}

  /**
   * Intercepte les requêtes HTTP pour ajouter le token d'authentification
   * @param request - La requête HTTP à intercepter
   * @param next - Le gestionnaire HTTP suivant dans la chaîne
   * @returns Un Observable contenant l'événement HTTP modifié
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
} 