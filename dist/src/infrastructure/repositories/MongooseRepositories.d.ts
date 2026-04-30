import { UserRepository } from '../../application/ports/UserRepository';
import { ServiceRepository } from '../../application/ports/ServiceRepository';
import { BookingRepository } from '../../application/ports/BookingRepository';
import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';
/**
 * Mongoose implementation of the user repository.
 */
export declare class MongooseUserRepository implements UserRepository {
    save(user: IUser): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
}
/**
 * Mongoose implementation of the service repository.
 */
export declare class MongooseServiceRepository implements ServiceRepository {
    save(serviceData: IService): Promise<IService>;
    findById(id: string): Promise<IService | null>;
    findAll(filters?: Record<string, any>, options?: Record<string, any>): Promise<{
        services: IService[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>;
    update(id: string, serviceData: Partial<IService>): Promise<IService | null>;
    delete(id: string): Promise<boolean>;
}
/**
 * Mongoose implementation of the booking repository.
 */
export declare class MongooseBookingRepository implements BookingRepository {
    save(bookingData: IBooking): Promise<IBooking>;
    findByUserId(userId: string): Promise<IBooking[]>;
    findAll(): Promise<IBooking[]>;
    findById(id: string): Promise<IBooking | null>;
}
//# sourceMappingURL=MongooseRepositories.d.ts.map