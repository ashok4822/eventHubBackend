export interface UserDTO {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}
export interface AuthResponseDTO {
    user: UserDTO;
    accessToken: string;
    refreshToken?: string;
}
//# sourceMappingURL=UserDTO.d.ts.map