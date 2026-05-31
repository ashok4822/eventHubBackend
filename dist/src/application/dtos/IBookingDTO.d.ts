import { BookingStatus } from '../../domain/entities/Booking';
import { IUserDTO } from './IUserDTO';
import { IServiceDTO } from './IServiceDTO';
export interface IBookingDTO {
    id: string;
    _id?: string;
    userId: string | IUserDTO;
    serviceId: string | IServiceDTO;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status?: BookingStatus;
}
export interface ICreateBookingRequestDTO {
    userId: string;
    serviceId: string;
    startDate: string;
    endDate: string;
}
//# sourceMappingURL=IBookingDTO.d.ts.map