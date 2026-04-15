import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useEffect, useState } from 'react';

import SmallNaviBar from '@/components/common/smallNaviBar';
import Tabs from '@/components/Tabs';
import EmptyState from '@/components/EmptyState';

import { Booking } from '@/types/booking';

export default function MyBookings() {

  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [data, setData] = useState<Booking[]>([]);

  const user = {
    id: "123",
    isLoggedIn: true
  };

  async function getUserBookingsFromFirebase(userId: string): Promise<Booking[]> {

    const hotels = [
      {
        id: "h1",
        name: "Royal Hotel",
        city: "Paris",
        image: "https://images.unsplash.com/photo-1501117716987-c8e2a3c7f9d4",
        bookings: [
          {
            userId: "123",
            status: "completed",
            dateFrom: "12 Aug",
            dateTo: "18 Aug",
            rooms: 2,
            guests: 3
          }
        ]
      },
      {
        id: "h2",
        name: "Grand Palace",
        city: "Rome",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        bookings: [
          {
            userId: "123",
            status: "active",
            dateFrom: "5 Sep",
            dateTo: "10 Sep",
            rooms: 1,
            guests: 2
          }
        ]
      }
    ];

    const result: Booking[] = [];

    hotels.forEach(hotel => {
      hotel.bookings.forEach((b, index) => {
        if (b.userId === userId) {
          result.push({
            id: hotel.id + "_" + index,
            userId: b.userId,
            hotelId: hotel.id,
            hotelName: hotel.name,
            city: hotel.city,
            image: hotel.image,
            dateFrom: b.dateFrom,
            dateTo: b.dateTo,
            rooms: b.rooms,
            guests: b.guests,
            status: b.status as any
          });
        }
      });
    });

    return result;
  }

  useEffect(() => {
    if (user.isLoggedIn) {
      getUserBookingsFromFirebase(user.id).then(setData);
    } else {
      setData([]);
    }
  }, []);

  const active = data.filter(item => item.status === 'active');

  const past = data.filter(
    item => item.status === 'completed' || item.status === 'cancelled'
  );

  const renderCard = (item: Booking) => (
    <View key={item.id} style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.hotelName}</Text>
        <Text style={styles.city}>{item.city}</Text>

        <Text>{item.dateFrom} - {item.dateTo}</Text>
        <Text>{item.rooms} Rooms • {item.guests} Guests</Text>

        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <SmallNaviBar>
        <></>
      </SmallNaviBar>

      {!user.isLoggedIn ? (

        <View style={styles.center}>
          <Text style={styles.title}>No bookings yet</Text>
          <Text style={styles.sub}>Sign in to see your bookings</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>

      ) : (

        <>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <ScrollView style={{ padding: 15 }}>

            {activeTab === 'active' ? (

              active.length ? active.map(renderCard) : <EmptyState />

            ) : (

              past.length ? past.map(renderCard) : <EmptyState />

            )}

          </ScrollView>

        </>

      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  sub: {
    color: 'gray',
    marginTop: 5
  },
  button: {
    marginTop: 15,
    backgroundColor: '#1f4ba5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  buttonText: {
    color: 'white'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 150
  },
  info: {
    padding: 10
  },
  city: {
    color: 'gray'
  },
  status: {
    marginTop: 5,
    color: '#1f4ba5'
  }
});