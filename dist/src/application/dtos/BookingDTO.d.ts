import { BookingStatus } from '../../domain/entities/Booking';
export interface BookingDTO {
    id: string;
    userId: string;
    serviceId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status?: BookingStatus;
}
export interface CreateBookingRequestDTO {
    userId: string;
    serviceId: string;
    startDate: string;
    endDate: string;
}
//# sourceMappingURL=BookingDTO.d.ts.map