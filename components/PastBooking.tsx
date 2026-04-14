import { ScrollView, StyleSheet } from 'react-native';
import { Booking } from '../types/booking';
import BookingCard from './mybookingcard';

type Props = {
  bookings: Booking[];
};

export default function PastBookings({ bookings }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
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