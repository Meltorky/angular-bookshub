export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleName: 'Author' | 'Subscriber';
}

export interface AuthResponse {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    roleName: string;
    token: string;
    expiresOn: Date;
    refreshTokenExpiresOn: Date;
}

export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    roleName: string;
    token: string;
}
