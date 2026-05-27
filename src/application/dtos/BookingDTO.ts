import { BookingStatus } from '../../domain/entities/Booking';
import { IUserDTO } from './UserDTO';
import { IServiceDTO } from './ServiceDTO';

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
