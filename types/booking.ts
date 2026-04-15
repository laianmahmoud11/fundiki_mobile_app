export type BookingStatus = 'active' | 'completed' | 'cancelled';

export type Booking = {
  id: string;
  userId: string;

  hotelId: string;
  hotelName: string;
  city: string;
  image: string;

  dateFrom: string;
  dateTo: string;

  rooms: number;
  guests: number;

  status: BookingStatus;
};