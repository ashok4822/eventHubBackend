
import { IService } from '../../domain/entities/Service';
import { IServiceFilters } from './ServiceRepository';
import { IQueryOptions } from './QueryOptions';
import { IUserDTO, IAuthResponseDTO } from '../dtos/UserDTO';
import { IServiceDTO, ICreateServiceRequestDTO } from '../dtos/ServiceDTO';
import { IBookingDTO, ICreateBookingRequestDTO } from '../dtos/BookingDTO';

// User Use Cases
export interface IRegisterUser {
  execute(data: { name: string; email: string; password: string; role?: 'user' | 'admin' }): Promise<IUserDTO>;
}

export interface ILoginUser {
  execute(data: { email: string; password: string }): Promise<IAuthResponseDTO>;
}

export interface IRefreshToken {
  execute(refreshToken: string): Promise<{ accessToken: string }>;
}

export interface IRequestPasswordReset {
  execute(email: string): Promise<void>;
}

export interface IResetPassword {
  execute(token: string, password: string): Promise<void>;
}

// Service Use Cases
export interface IAddService {
  execute(data: ICreateServiceRequestDTO): Promise<IServiceDTO>;
}

export interface IEditService {
  execute(id: string, data: Partial<IService>): Promise<IServiceDTO | null>;
}

export interface IDeleteService {
  execute(id: string): Promise<boolean>;
}

export interface IGetAllServices {
  execute(query: IQueryOptions & IServiceFilters): Promise<{
    services: IServiceDTO[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }>;
}

// Booking Use Cases
export interface IBookService {
  execute(data: ICreateBookingRequestDTO): Promise<IBookingDTO>;
}

export interface IGetUserBookings {
  execute(userId: string): Promise<IBookingDTO[]>;
}

export interface IGetAdminBookings {
  execute(): Promise<IBookingDTO[]>;
}

