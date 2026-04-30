import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';
export interface EmailService {
    sendBookingConfirmation(user: IUser, service: IService, booking: IBooking): Promise<void>;
}
//# sourceMappingURL=EmailService.d.ts.map