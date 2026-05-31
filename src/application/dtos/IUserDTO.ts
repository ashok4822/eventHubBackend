export interface IUserDTO {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface IAuthResponseDTO {
  user: IUserDTO;
  accessToken: string;
  refreshToken?: string;
}
