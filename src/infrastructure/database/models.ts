import mongoose, { Schema, Document, Types } from 'mongoose';
import { SERVICE_CATEGORIES } from '../../domain/constants/ServiceCategories';
import { ServiceCategory } from '../../domain/entities/Service';

// ---- Interfaces ----
export interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IServiceDocument extends Document {
  title: string;
  category: ServiceCategory;
  pricePerDay: number;
  description: string;
  availabilityDates: string[];
  contactDetails: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookingDocument extends Document {
  userId: Types.ObjectId;
  serviceId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// ---- Schemas ----
const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

const serviceSchema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: SERVICE_CATEGORIES,
    },
    pricePerDay: { type: Number, required: true },
    description: { type: String, required: true },
    availabilityDates: { type: [String], default: [] },
    contactDetails: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

const bookingSchema = new Schema<IBookingDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  },
  { timestamps: true }
);

/**
 * Compound index to prevent duplicate confirmed bookings for the same service
 * and exact date range.  This is the final atomic guard against race conditions
 * when two requests pass the application-layer overlap check simultaneously.
 * Only applies to 'confirmed' bookings (sparse: true allows multiple cancelled ones).
 */
bookingSchema.index(
  { serviceId: 1, startDate: 1, endDate: 1 },
  { unique: true, partialFilterExpression: { status: 'confirmed' } }
);

// ---- Models ----
export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
export const ServiceModel = mongoose.model<IServiceDocument>('Service', serviceSchema);
export const BookingModel = mongoose.model<IBookingDocument>('Booking', bookingSchema);
