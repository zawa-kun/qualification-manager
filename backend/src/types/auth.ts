export interface RegisterUserRequest {
    email: string;
    password: string;
}

export interface AuthUserResponse {
    id: number;
    email: string;
    created_at: DataTransfer;
    token: string; // JWTトークン.
}
