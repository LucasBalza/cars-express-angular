import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Car, CreateCarDTO, UpdateCarDTO } from '../models/car.model';

/**
 * Service gérant les opérations CRUD sur les voitures
 * @class CarService
 */
@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = `${environment.apiUrl}/cars`;

  /**
   * Crée une instance du service
   * @param {HttpClient} http - Le client HTTP pour effectuer les requêtes
   */
  constructor(private http: HttpClient) {}

  /**
   * Récupère toutes les voitures
   * @returns {Observable<Car[]>} Un Observable contenant la liste des voitures
   */
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  /**
   * Récupère une voiture par son identifiant
   * @param {string} id - L'identifiant de la voiture
   * @returns {Observable<Car>} Un Observable contenant la voiture
   */
  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crée une nouvelle voiture
   * @param {CreateCarDTO} car - Les données de la voiture à créer
   * @returns {Observable<Car>} Un Observable contenant la voiture créée
   */
  createCar(car: CreateCarDTO): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  /**
   * Met à jour une voiture existante
   * @param {number} id - L'identifiant de la voiture à mettre à jour
   * @param {UpdateCarDTO} car - Les nouvelles données de la voiture
   * @returns {Observable<Car>} Un Observable contenant la voiture mise à jour
   */
  updateCar(id: number, car: UpdateCarDTO): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car);
  }

  /**
   * Supprime une voiture
   * @param {number} id - L'identifiant de la voiture à supprimer
   * @returns {Observable<void>} Un Observable indiquant que la suppression est terminée
   */
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
