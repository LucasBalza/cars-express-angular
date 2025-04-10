import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserRole } from '../../../models/user.model';

/**
 * Composant d'inscription permettant aux utilisateurs de créer un compte
 * @class RegisterComponent
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string = '';
  loading: boolean = false;
  roles = Object.values(UserRole);

  /**
   * Crée une instance du composant d'inscription
   * @param formBuilder - Service de construction de formulaires
   * @param authService - Service d'authentification
   * @param router - Service de routage
   */
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['USER', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  /**
   * Valide que les mots de passe correspondent
   * @param g - Le groupe de formulaire à valider
   * @returns null si les mots de passe correspondent, un objet d'erreur sinon
   */
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  /**
   * Gère la soumission du formulaire d'inscription
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/cars']);
      },
      error: (error) => {
        this.error = error.error.message || 'Une erreur est survenue lors de l\'inscription';
        this.loading = false;
      }
    });
  }
}
