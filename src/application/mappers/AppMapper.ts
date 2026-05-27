import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';
import { IUserDTO } from '../dtos/UserDTO';
import { IServiceDTO } from '../dtos/ServiceDTO';
import { IBookingDTO } from '../dtos/BookingDTO';

export class AppMapper {
  static toUserDTO(user: IUser): IUserDTO {
    return {
      id: user.id!,
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  static toServiceDTO(service: IService): IServiceDTO {
    return {
      id: service.id!,
      _id: service.id,
      title: service.title,
      category: service.category,
      pricePerDay: service.pricePerDay,
      description: service.description,
      availabilityDates: service.availabilityDates,
      contactDetails: service.contactDetails,
      location: service.location,
    };
  }

  static toBookingDTO(booking: IBooking): IBookingDTO {
    return {
      id: booking.id!,
      _id: booking.id,
      userId: typeof booking.userId === 'string' ? booking.userId : this.toUserDTO(booking.userId),
      serviceId: typeof booking.serviceId === 'string' ? booking.serviceId : this.toServiceDTO(booking.serviceId),
      startDate: booking.startDate,
      endDate: booking.endDate,
      totalPrice: booking.totalPrice,
      status: booking.status,
    };
  }
}
