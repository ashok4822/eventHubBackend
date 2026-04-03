class Service {
  constructor({ id, title, category, pricePerDay, description, availabilityDates, contactDetails, location }) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.pricePerDay = pricePerDay;
    this.description = description;
    this.availabilityDates = availabilityDates; // Array of strings (ISO dates)
    this.contactDetails = contactDetails;
    this.location = location;
  }
}

export default Service;
