import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';

export class UserMapper {
  static toDomain(raw: any): IUser {
    return {
      id: raw._id.toString(),
      name: raw.name,
      email: raw.email,
      password: raw.password,
      role: raw.role,
      resetPasswordToken: raw.resetPasswordToken,
      resetPasswordExpires: raw.resetPasswordExpires,
    };
  }
}

export class ServiceMapper {
  static toDomain(raw: any): IService {
    return {
      id: raw._id.toString(),
      title: raw.title,
      category: raw.category,
      pricePerDay: raw.pricePerDay,
      description: raw.description,
      availabilityDates: raw.availabilityDates,
      contactDetails: raw.contactDetails,
      location: raw.location,
    };
  }
}

export class BookingMapper {
  static toDomain(raw: any): IBooking {
    const userId = (raw.userId && typeof raw.userId === 'object' && raw.userId._id)
      ? UserMapper.toDomain(raw.userId)
      : raw.userId?.toString();

    const serviceId = (raw.serviceId && typeof raw.serviceId === 'object' && raw.serviceId._id)
      ? ServiceMapper.toDomain(raw.serviceId)
      : raw.serviceId?.toString();

    return {
      id: raw._id.toString(),
      userId,
      serviceId,
      startDate: new Date(raw.startDate),
      endDate: new Date(raw.endDate),
      totalPrice: raw.totalPrice,
      status: raw.status,
    };
  }
}
