import { IService } from '../../domain/entities/Service';
import { ServiceFilters } from './ServiceRepository';
import { QueryOptions } from './QueryOptions';
import { UserDTO, AuthResponseDTO } from '../dtos/UserDTO';
import { ServiceDTO, CreateServiceRequestDTO } from '../dtos/ServiceDTO';
import { BookingDTO, CreateBookingRequestDTO } from '../dtos/BookingDTO';
export interface IRegisterUser {
    execute(data: {
        name: string;
        email: string;
        password: string;
        role?: 'user' | 'admin';
    }): Promise<UserDTO>;
}
export interface ILoginUser {
    execute(data: {
        email: string;
        password: string;
    }): Promise<AuthResponseDTO>;
}
export interface IRefreshToken {
    execute(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
export interface IAddService {
    execute(data: CreateServiceRequestDTO): Promise<ServiceDTO>;
}
export interface IEditService {
    execute(id: string, data: Partial<IService>): Promise<ServiceDTO | null>;
}
export interface IDeleteService {
    execute(id: string): Promise<boolean>;
}
export interface IGetAllServices {
    execute(query: QueryOptions & ServiceFilters): Promise<{
        services: ServiceDTO[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>;
}
export interface IBookService {
    execute(data: CreateBookingRequestDTO): Promise<BookingDTO>;
}
export interface IGetUserBookings {
    execute(userId: string): Promise<BookingDTO[]>;
}
export interface IGetAdminBookings {
    execute(): Promise<BookingDTO[]>;
}
//# sourceMappingURL=IUseCases.d.ts.map