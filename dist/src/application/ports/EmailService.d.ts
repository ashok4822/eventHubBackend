import { IUser } from '../../domain/entities/User';
import { IService } from '../../domain/entities/Service';
import { IBooking } from '../../domain/entities/Booking';
export interface IEmailService {
    sendBookingConfirmation(user: IUser, service: IService, booking: IBooking): Promise<void>;
    sendPasswordResetEmail(user: IUser, resetToken: string): Promise<void>;
}
//# sourceMappingURL=EmailService.d.ts.map