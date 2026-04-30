import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';
export declare class UserMapper {
    static toDomain(raw: any): IUser;
}
export declare class ServiceMapper {
    static toDomain(raw: any): IService;
}
export declare class BookingMapper {
    static toDomain(raw: any): IBooking;
}
//# sourceMappingURL=Mappers.d.ts.map