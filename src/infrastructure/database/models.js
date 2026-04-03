import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true, enum: ['venue', 'hotel', 'caterer', 'cameraman', 'DJ', 'other'] },
  pricePerDay: { type: Number, required: true },
  description: { type: String, required: true },
  availabilityDates: { type: [String], default: [] }, // Array of ISO strings or simplified date strings
  contactDetails: { type: String, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
const ServiceModel = mongoose.model('Service', serviceSchema);
const BookingModel = mongoose.model('Booking', bookingSchema);

export { UserModel, ServiceModel, BookingModel };
