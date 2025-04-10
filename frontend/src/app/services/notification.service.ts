import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

/**
 * Service de notification utilisant SweetAlert2 pour afficher des messages à l'utilisateur
 * @class NotificationService
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /**
   * Affiche une notification de succès
   * @param message - Le message à afficher
   */
  success(message: string): void {
    Swal.fire({
      title: 'Succès !',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#0d6efd'
    });
  }

  /**
   * Affiche une notification d'erreur
   * @param message - Le message d'erreur à afficher
   */
  error(message: string): void {
    Swal.fire({
      title: 'Erreur !',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#dc3545'
    });
  }

  /**
   * Affiche une boîte de dialogue de confirmation
   * @param title - Le titre de la boîte de dialogue
   * @param text - Le texte de la confirmation
   * @returns Une Promise qui se résout à true si l'utilisateur confirme, false sinon
   */
  confirm(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545'
    }).then((result: any) => result.isConfirmed);
  }
} 