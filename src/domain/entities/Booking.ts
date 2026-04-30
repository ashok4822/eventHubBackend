import { IUser } from './User';
import { IService } from './Service';

export type BookingStatus = 'confirmed' | 'cancelled';

export interface IBooking {
  id?: string;
  userId: string | IUser;
  serviceId: string | IService;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status?: BookingStatus;
}

class Booking implements IBooking {
  id?: string;
  userId: string | IUser;
  serviceId: string | IService;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: BookingStatus;

  constructor(data: IBooking) {
    this.id = data.id;
    this.userId = data.userId;
    this.serviceId = data.serviceId;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.totalPrice = data.totalPrice;
    this.status = data.status || 'confirmed';
  }

  /**
   * Validates the booking dates.
   * Business rule: Start date cannot be in the past, and end date must be after start date.
   */
  public static validateDates(startDate: Date, endDate: Date): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      throw new Error('Start date cannot be in the past');
    }

    if (endDate < startDate) {
      throw new Error('End date must be after start date');
    }
  }

  public static calculateTotalPrice(startDate: Date, endDate: Date, pricePerDay: number): number {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const diffDays = Math.round(Math.abs(endDate.getTime() - startDate.getTime()) / MS_PER_DAY) + 1;
    return pricePerDay * diffDays;
  }
}

export default Booking;
