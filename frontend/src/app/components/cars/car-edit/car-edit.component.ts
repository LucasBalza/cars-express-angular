import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { Car, UpdateCarDTO } from '../../../models/car.model';
import { NotificationService } from '../../../services/notification.service';

/**
 * Composant pour l'édition d'une voiture existante
 * Gère le formulaire d'édition avec validation des champs
 * @class CarEditComponent
 */
@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class CarEditComponent implements OnInit {
  carForm: FormGroup;
  error: string | null = null;
  loading = false;
  car: Car | null = null;
  maxYear = new Date().getFullYear() + 1;
  currentYear = new Date().getFullYear();
  carId: string | null = null;

  /**
   * Crée une instance du composant
   * @param {FormBuilder} formBuilder - Service de construction de formulaire
   * @param {ActivatedRoute} route - Service pour accéder aux paramètres de route
   * @param {Router} router - Service de routage
   * @param {CarService} carService - Service pour les opérations sur les voitures
   * @param {NotificationService} notificationService - Service de notifications
   */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private notificationService: NotificationService
  ) {
    this.carForm = this.formBuilder.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(this.maxYear)]],
      color: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  /**
   * Initialise le composant en chargeant les données de la voiture
   */
  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get('id');
    if (this.carId) {
      this.loading = true;
      this.carService.getCarById(this.carId).subscribe({
        next: (car: Car) => {
          this.car = car;
          this.carForm.patchValue({
            brand: car.brand,
            model: car.model,
            year: car.year,
            color: car.color,
            price: car.price
          });
          this.loading = false;
        },
        error: (error: any) => {
          this.error = error.error.message || 'Une erreur est survenue lors du chargement de la voiture';
          this.loading = false;
        }
      });
    } else {
      this.router.navigate(['/cars']);
    }
  }

  /**
   * Vérifie si un champ du formulaire est invalide
   * @param {string} fieldName - Nom du champ à vérifier
   * @returns {boolean} True si le champ est invalide et a été touché
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.carForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  /**
   * Gère la soumission du formulaire
   * Valide les champs et envoie les modifications au serveur
   */
  onSubmit(): void {
    if (this.carForm.valid && this.carId) {
      this.loading = true;
      this.error = null;

      const updatedCar: UpdateCarDTO = this.carForm.value;

      this.carService.updateCar(Number(this.carId), updatedCar).subscribe({
        next: () => {
          this.notificationService.success('La voiture a été mise à jour avec succès');
          this.router.navigate(['/cars', this.carId]);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error.message || 'Une erreur est survenue lors de la mise à jour de la voiture';
        }
      });
    } else {
      Object.keys(this.carForm.controls).forEach(key => {
        const control = this.carForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
