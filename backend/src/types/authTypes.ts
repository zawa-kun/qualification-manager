export interface RegisterUserRequest {
    email: string;
    password: string;
}

export interface AuthUserResponse {
    id: number;
    email: string;
    createdAt: DataTransfer;
    token: string; // JWTトークン.
}

export interface AuthError {
    message: string;
}
