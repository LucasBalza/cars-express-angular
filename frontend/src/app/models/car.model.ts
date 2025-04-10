/**
 * Interface représentant une voiture dans l'application
 * @interface Car
 */
export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    color: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Interface pour la création d'une nouvelle voiture
 * @interface CreateCarDTO
 */
export interface CreateCarDTO {
    brand: string;
    model: string;
    year: number;
    color: string;
    price: number;
}

/**
 * Interface pour la mise à jour d'une voiture existante
 * Tous les champs sont optionnels car on peut mettre à jour partiellement
 * @interface UpdateCarDTO
 */
export interface UpdateCarDTO {
    brand?: string;
    model?: string;
    year?: number;
    color?: string;
    price?: number;
} 