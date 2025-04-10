/**
 * Énumération des rôles utilisateur disponibles dans l'application
 * @enum {string}
 */
export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

/**
 * Interface représentant un utilisateur dans l'application
 * @interface User
 */
export interface User {
    id: number;
    email: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Interface pour les données de connexion d'un utilisateur
 * @interface UserLogin
 */
export interface UserLogin {
    email: string;
    password: string;
}

/**
 * Interface pour les données d'inscription d'un utilisateur
 * @interface UserRegister
 */
export interface UserRegister extends UserLogin {
    confirmPassword: string;
    role: UserRole;
} 