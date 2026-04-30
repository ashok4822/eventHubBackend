import { BookingStatus } from '../../domain/entities/Booking';
import { UserDTO } from './UserDTO';
import { ServiceDTO } from './ServiceDTO';

export interface BookingDTO {
  id: string;
  _id?: string;
  userId: string | UserDTO;
  serviceId: string | ServiceDTO;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status?: BookingStatus;
}

export interface CreateBookingRequestDTO {
  userId: string;
  serviceId: string;
  startDate: string;
  endDate: string;
}
