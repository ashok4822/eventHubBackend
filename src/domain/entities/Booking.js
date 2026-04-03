class Booking {
  constructor({ id, userId, serviceId, startDate, endDate, totalPrice, status = 'confirmed' }) {
    this.id = id;
    this.userId = userId;
    this.serviceId = serviceId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.totalPrice = totalPrice;
    this.status = status;
  }
}

export default Booking;
