import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/car.model';
import { NotificationService } from '../../../services/notification.service';
import { AuthService } from '../../../services/auth.service';

/**
 * Composant affichant les détails d'une voiture
 * Permet de visualiser les informations détaillées et de gérer la suppression
 * @class CarDetailComponent
 */
@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  car: Car | null = null;
  loading = false;
  error: string | null = null;
  isAdmin = false;

  /**
   * Crée une instance du composant
   * @param {ActivatedRoute} route - Service pour accéder aux paramètres de route
   * @param {Router} router - Service de routage
   * @param {CarService} carService - Service pour les opérations sur les voitures
   * @param {NotificationService} notificationService - Service de notifications
   * @param {AuthService} authService - Service d'authentification
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  /**
   * Initialise le composant en chargeant les détails de la voiture
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.carService.getCarById(id).subscribe({
        next: (car: Car) => {
          this.car = car;
          this.loading = false;
        },
        error: (error: any) => {
          this.error = error.error.message || 'Une erreur est survenue lors du chargement de la voiture';
          this.loading = false;
        }
      });
    }
  }

  /**
   * Redirige vers la page d'édition de la voiture
   */
  onEdit(): void {
    if (this.car) {
      this.router.navigate(['/cars', this.car.id, 'edit']);
    }
  }

  /**
   * Gère la suppression de la voiture
   * Demande confirmation avant de supprimer
   */
  async onDelete(): Promise<void> {
    if (!this.car) return;

    const confirmed = await this.notificationService.confirm(
      'Confirmation de suppression',
      `Êtes-vous sûr de vouloir supprimer la voiture ${this.car.brand} ${this.car.model} ?`
    );

    if (confirmed) {
      this.loading = true;
      this.carService.deleteCar(this.car.id).subscribe({
        next: () => {
          this.notificationService.success('La voiture a été supprimée avec succès');
          this.router.navigate(['/cars']);
        },
        error: (error: any) => {
          this.notificationService.error(error.error.message || 'Une erreur est survenue lors de la suppression de la voiture');
          this.loading = false;
        }
      });
    }
  }
}
