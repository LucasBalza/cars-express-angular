import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

/**
 * Intercepteur HTTP qui enregistre les détails des requêtes et réponses HTTP dans la console
 * @function LoggingInterceptor
 * @param req - La requête HTTP à intercepter
 * @param next - Le gestionnaire HTTP suivant dans la chaîne
 * @returns Un Observable contenant l'événement HTTP avec les logs
 */
export const LoggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🔄 Intercepteur appelé');
  
  const startTime = Date.now();
  
  console.group(`🌐 Requête HTTP: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  
  return next(req).pipe(
    tap({
      next: (event) => {
        const endTime = Date.now();
        console.log(`✅ Réponse reçue en ${endTime - startTime}ms`);
        console.log('Event:', event);
        console.groupEnd();
      },
      error: (error) => {
        const endTime = Date.now();
        console.error(`❌ Erreur après ${endTime - startTime}ms:`, error);
        console.groupEnd();
      }
    })
  );
}; 