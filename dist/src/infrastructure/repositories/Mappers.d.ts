import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';
import { IUserDocument, IServiceDocument, IBookingDocument } from '../database/models';
export declare class UserMapper {
    static toDomain(doc: IUserDocument): IUser;
}
export declare class ServiceMapper {
    static toDomain(doc: IServiceDocument): IService;
}
export declare class BookingMapper {
    static toDomain(doc: IBookingDocument): IBooking;
}
//# sourceMappingURL=Mappers.d.ts.map