import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking, BookingStatus } from '../../domain/entities/Booking';
import { IUserDocument, IServiceDocument, IBookingDocument } from '../database/models';
import { Types } from 'mongoose';

export class UserMapper {
  static toDomain(doc: IUserDocument): IUser {
    return {
      id: (doc._id as Types.ObjectId).toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password || '',
      role: doc.role,
      resetPasswordToken: doc.resetPasswordToken,
      resetPasswordExpires: doc.resetPasswordExpires,
    };
  }
}

export class ServiceMapper {
  static toDomain(doc: IServiceDocument): IService {
    return {
      id: (doc._id as Types.ObjectId).toString(),
      title: doc.title,
      category: doc.category,
      pricePerDay: doc.pricePerDay,
      description: doc.description,
      availabilityDates: doc.availabilityDates,
      contactDetails: doc.contactDetails,
      location: doc.location,
    };
  }
}

export class BookingMapper {
  static toDomain(doc: IBookingDocument): IBooking {
    const userDoc = doc.userId as unknown as IUserDocument;
    const userId = (userDoc && typeof userDoc === 'object' && '_id' in userDoc)
      ? UserMapper.toDomain(userDoc)
      : (doc.userId as Types.ObjectId).toString();

    const serviceDoc = doc.serviceId as unknown as IServiceDocument;
    const serviceId = (serviceDoc && typeof serviceDoc === 'object' && '_id' in serviceDoc)
      ? ServiceMapper.toDomain(serviceDoc)
      : (doc.serviceId as Types.ObjectId).toString();

    return {
      id: (doc._id as Types.ObjectId).toString(),
      userId: userId as string | IUser,
      serviceId: serviceId as string | IService,
      startDate: new Date(doc.startDate),
      endDate: new Date(doc.endDate),
      totalPrice: doc.totalPrice,
      status: doc.status as BookingStatus,
    };
  }
}
