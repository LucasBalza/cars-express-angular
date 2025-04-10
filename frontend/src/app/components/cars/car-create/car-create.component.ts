import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarService } from '../../../services/car.service';
import { NotificationService } from '../../../services/notification.service';

/**
 * Composant pour la création d'une nouvelle voiture
 * Gère le formulaire de création avec validation des champs
 * @class CarCreateComponent
 */
@Component({
  selector: 'app-car-create',
  templateUrl: './car-create.component.html',
  styleUrls: ['./car-create.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class CarCreateComponent implements OnInit {
  carForm: FormGroup;
  loading = false;
  maxYear = new Date().getFullYear() + 1;

  /**
   * Crée une instance du composant
   * @param {FormBuilder} fb - Service de construction de formulaire
   * @param {CarService} carService - Service pour les opérations sur les voitures
   * @param {Router} router - Service de routage
   * @param {NotificationService} notificationService - Service de notifications
   */
  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.carForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(this.maxYear)]],
      color: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  /**
   * Initialise le composant
   */
  ngOnInit(): void {}

  /**
   * Gère la soumission du formulaire
   * Valide les champs et envoie les données au serveur
   */
  onSubmit(): void {
    if (this.carForm.valid) {
      this.loading = true;
      this.carService.createCar(this.carForm.value).subscribe({
        next: () => {
          this.notificationService.success('La voiture a été créée avec succès');
          this.router.navigate(['/cars']);
        },
        error: (error) => {
          this.loading = false;
          this.notificationService.error(error.message || 'Une erreur est survenue lors de la création de la voiture');
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

  /**
   * Vérifie si un champ du formulaire est invalide
   * @param {string} fieldName - Nom du champ à vérifier
   * @returns {boolean} True si le champ est invalide et a été touché
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.carForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}
