import { IBooking } from '../../domain/entities/Booking';
import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';

export const BOOKING_EVENTS = {
  CREATED: 'booking:created',
};

export interface BookingCreatedEventData {
  booking: IBooking;
  user: IUser;
  service: IService;
}
