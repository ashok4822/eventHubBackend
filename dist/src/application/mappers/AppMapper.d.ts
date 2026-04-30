import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';
import { UserDTO } from '../dtos/UserDTO';
import { ServiceDTO } from '../dtos/ServiceDTO';
import { BookingDTO } from '../dtos/BookingDTO';
export declare class AppMapper {
    static toUserDTO(user: IUser): UserDTO;
    static toServiceDTO(service: IService): ServiceDTO;
    static toBookingDTO(booking: IBooking): BookingDTO;
}
//# sourceMappingURL=AppMapper.d.ts.map