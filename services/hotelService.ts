import { Hotel } from '../types/hotel';
import {
  getHotelsFromFirebase,
  getHotelByIdFromFirebase
} from './firebase/firebasehotelSource';

type HomeHotel = {
  id: string;
  city: string;
  name: string;
  rating: string;
  reviewText: string;
  reviews: string;
  badge: string | null;
  nights: string;
  oldPrice: string;
  newPrice: string;
  image: string;
  hasDiscount: boolean;
};

const fallbackHomeHotels: HomeHotel[] = [
  {
    id: '1',
    city: 'Amman',
    name: 'Amman Grand Hotel',
    rating: '8.8',
    reviewText: 'Fabulous',
    reviews: '2806 reviews',
    badge: 'Weekend deal',
    nights: '2 nights',
    oldPrice: 'EUR 445',
    newPrice: 'EUR 313',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    hasDiscount: true,
  },
  {
    id: '2',
    city: 'Cairo',
    name: 'Cairo Palace Stay',
    rating: '8.1',
    reviewText: 'Very good',
    reviews: '9409 reviews',
    badge: null,
    nights: '2 nights',
    oldPrice: 'EUR 241',
    newPrice: 'EUR 219',
    image:
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=900&q=80',
    hasDiscount: true,
  },
  {
    id: '3',
    city: 'Riyadh',
    name: 'Riyadh Moon Resort',
    rating: '8.7',
    reviewText: 'Excellent',
    reviews: '1934 reviews',
    badge: 'Member price',
    nights: '3 nights',
    oldPrice: 'EUR 510',
    newPrice: 'EUR 399',
    image:
      'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=900&q=80',
    hasDiscount: true,
  },
  {
    id: '4',
    city: 'Doha',
    name: 'Doha Heritage Stay',
    rating: '8.0',
    reviewText: 'Very good',
    reviews: '521 reviews',
    badge: null,
    nights: '1 night',
    oldPrice: 'EUR 155',
    newPrice: 'EUR 140',
    image:
      'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=900&q=80',
    hasDiscount: false,
  },
  {
    id: '5',
    city: 'Abu Dhabi',
    name: 'Abu Dhabi Corniche Hotel',
    rating: '9.0',
    reviewText: 'Wonderful',
    reviews: '1780 reviews',
    badge: 'Top rated',
    nights: '2 nights',
    oldPrice: 'EUR 320',
    newPrice: 'EUR 280',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    hasDiscount: true,
  },
  {
    id: '6',
    city: 'Kuwait City',
    name: 'Kuwait City Business Hotel',
    rating: '8.5',
    reviewText: 'Excellent',
    reviews: '860 reviews',
    badge: null,
    nights: '2 nights',
    oldPrice: 'EUR 230',
    newPrice: 'EUR 199',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    hasDiscount: false,
  },
];

function mapFirebaseHotelToHomeHotel(hotel: Hotel): HomeHotel {
  const numericRating = Number(hotel.rating ?? 0);
  const clampedRating = Number.isFinite(numericRating)
    ? numericRating.toFixed(1)
    : '0.0';

  return {
    id: hotel.id,
    city: hotel.city ?? '',
    name: hotel.name ?? 'Hotel',
    rating: clampedRating,
    reviewText: numericRating >= 8.5 ? 'Excellent' : numericRating >= 8 ? 'Very good' : 'Good',
    reviews: '0 reviews',
    badge: null,
    nights: '2 nights',
    oldPrice: '',
    newPrice: hotel.pricePerNight ? `EUR ${hotel.pricePerNight}` : '',
    image: hotel.image ?? '',
    hasDiscount: false,
  };
}

async function getHomeHotels(): Promise<HomeHotel[]> {
  try {
    const firebaseHotels = await getHotelsFromFirebase();

    if (firebaseHotels.length > 0) {
      return firebaseHotels.map(mapFirebaseHotelToHomeHotel);
    }

    return fallbackHomeHotels;
  } catch {
    return fallbackHomeHotels;
  }
}

export async function getHotels(): Promise<Hotel[]> {
  try {
    const firebaseHotels = await getHotelsFromFirebase();

    if (firebaseHotels.length > 0) {
      return firebaseHotels;
    }

    return fallbackHomeHotels.map((hotel) => ({
      id: hotel.id,
      city: hotel.city,
      name: hotel.name,
      country: hotel.city,
      image: hotel.image,
      pricePerNight: Number((hotel.newPrice || '0').replace(/[^0-9.]/g, '')),
      rating: Number(hotel.rating),
    }));
  } catch {
    return fallbackHomeHotels.map((hotel) => ({
      id: hotel.id,
      city: hotel.city,
      name: hotel.name,
      country: hotel.city,
      image: hotel.image,
      pricePerNight: Number((hotel.newPrice || '0').replace(/[^0-9.]/g, '')),
      rating: Number(hotel.rating),
    }));
  }
}

export async function getHotelById(hotelId: string): Promise<Hotel | null> {
  try {
    const firebaseHotel = await getHotelByIdFromFirebase(hotelId);

    if (firebaseHotel) {
      return firebaseHotel;
    }
  } catch {
    // Fall back to static data when Firestore is unavailable.
  }

  const fallback = fallbackHomeHotels.find((hotel) => hotel.id === hotelId);

  if (!fallback) {
    return null;
  }

  return {
    id: fallback.id,
    city: fallback.city,
    name: fallback.name,
    country: fallback.city,
    image: fallback.image,
    pricePerNight: Number((fallback.newPrice || '0').replace(/[^0-9.]/g, '')),
    rating: Number(fallback.rating),
  };
}

export async function getWeekendDeals(): Promise<HomeHotel[]> {
  const hotels = await getHomeHotels();
  const discountedHotels = hotels.filter((hotel) => hotel.hasDiscount);

  if (discountedHotels.length > 0) {
    return discountedHotels.slice(0, 3);
  }

  return hotels.slice(0, 3);
}

export async function getPopularCapitalHotels(): Promise<HomeHotel[]> {
  const hotels = await getHomeHotels();
  const weekendIds = new Set((await getWeekendDeals()).map((h) => h.id));

  const sortedByRating = [...hotels]
    .filter((h) => !weekendIds.has(h.id))
    .sort((a, b) => Number(b.rating) - Number(a.rating));

  if (sortedByRating.length >= 3) {
    return sortedByRating.slice(0, 3);
  }

  return [...hotels]
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, 3);
}

export async function searchHotels(filters: { destination?: string }): Promise<HomeHotel[]> {
  const hotels = await getHomeHotels();
  const destinationText = filters.destination?.trim().toLowerCase() ?? '';

  if (!destinationText) {
    return hotels;
  }

  return hotels.filter((hotel) => {
    const city = hotel.city.toLowerCase();
    const name = hotel.name.toLowerCase();
    return city.includes(destinationText) || name.includes(destinationText);
  });
}