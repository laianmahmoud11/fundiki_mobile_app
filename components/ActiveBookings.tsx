import { ScrollView, StyleSheet } from 'react-native';
import { Booking } from '../types/booking';
import BookingCard from './mybookingcard';

type Props = {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onCompleteBooking: (bookingId: string) => void;
};

export default function ActiveBookings({
  bookings,
  onCancelBooking,
  onCompleteBooking
}: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          showActions
          onCancelBooking={onCancelBooking}
          onCompleteBooking={onCompleteBooking}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 30
  }
});