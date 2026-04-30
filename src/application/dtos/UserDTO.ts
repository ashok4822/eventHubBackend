export interface UserDTO {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponseDTO {
  user: UserDTO;
  accessToken: string;
  refreshToken?: string;
}
