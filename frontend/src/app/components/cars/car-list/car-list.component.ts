import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { AuthService } from '../../../services/auth.service';
import { Car } from '../../../models/car.model';
import { NotificationService } from '../../../services/notification.service';

/**
 * Composant affichant la liste des voitures
 * Permet de visualiser, supprimer et naviguer vers les détails des voitures
 * @class CarListComponent
 */
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  loading: boolean = true;
  error: string | null = null;
  isAdmin: boolean = false;

  /**
   * Crée une instance du composant
   * @param {CarService} carService - Service pour les opérations sur les voitures
   * @param {AuthService} authService - Service d'authentification
   * @param {Router} router - Service de routage
   * @param {NotificationService} notificationService - Service de notifications
   */
  constructor(
    private carService: CarService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.isAdmin = this.authService.currentUser?.role === 'ADMIN';
  }

  /**
   * Initialise le composant en chargeant la liste des voitures
   */
  ngOnInit(): void {
    this.loadCars();
  }

  /**
   * Charge la liste des voitures depuis l'API
   */
  loadCars(): void {
    this.loading = true;
    this.error = null;

    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.loading = false;
      },
      error: (error: any) => {
        this.notificationService.error(error.error.message || 'Une erreur est survenue lors du chargement des voitures');
        this.loading = false;
      }
    });
  }

  /**
   * Gère la suppression d'une voiture
   * @param {Car} car - La voiture à supprimer
   * @param {Event} event - L'événement du clic
   */
  async onDelete(car: Car, event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    const confirmed = await this.notificationService.confirm(
      'Confirmation de suppression',
      `Êtes-vous sûr de vouloir supprimer la voiture ${car.brand} ${car.model} ?`
    );

    if (confirmed) {
      this.loading = true;
      this.carService.deleteCar(car.id).subscribe({
        next: () => {
          this.notificationService.success('La voiture a été supprimée avec succès');
          this.loadCars();
        },
        error: (error: any) => {
          this.notificationService.error(error.error.message || 'Une erreur est survenue lors de la suppression de la voiture');
          this.loading = false;
        }
      });
    }
  }

  /**
   * Gère la déconnexion de l'utilisateur
   */
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
