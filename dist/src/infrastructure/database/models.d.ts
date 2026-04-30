import mongoose, { Document, Types } from 'mongoose';
import { ServiceCategory } from '../../domain/entities/Service';
export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
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
export declare const UserModel: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, mongoose.DefaultSchemaOptions> & IUserDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUserDocument>;
export declare const ServiceModel: mongoose.Model<IServiceDocument, {}, {}, {}, mongoose.Document<unknown, {}, IServiceDocument, {}, mongoose.DefaultSchemaOptions> & IServiceDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IServiceDocument>;
export declare const BookingModel: mongoose.Model<IBookingDocument, {}, {}, {}, mongoose.Document<unknown, {}, IBookingDocument, {}, mongoose.DefaultSchemaOptions> & IBookingDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IBookingDocument>;
//# sourceMappingURL=models.d.ts.map