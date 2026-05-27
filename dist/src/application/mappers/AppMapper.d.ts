import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';
import { IUserDTO } from '../dtos/UserDTO';
import { IServiceDTO } from '../dtos/ServiceDTO';
import { IBookingDTO } from '../dtos/BookingDTO';
export declare class AppMapper {
    static toUserDTO(user: IUser): IUserDTO;
    static toServiceDTO(service: IService): IServiceDTO;
    static toBookingDTO(booking: IBooking): IBookingDTO;
}
//# sourceMappingURL=AppMapper.d.ts.map