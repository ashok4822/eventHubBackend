export const SERVICE_CATEGORIES = ['venue', 'hotel', 'caterer', 'cameraman', 'DJ', 'other'] as const;

export type ServiceCategory = typeof SERVICE_CATEGORIES[number];
