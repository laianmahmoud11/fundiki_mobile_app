import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { Hotel } from '../../types/hotel';
import { db } from './firebaseconfig';

function mapHotel(docSnap: any): Hotel {
  const data = docSnap.data();

  return {
    id: docSnap.id,
    name: data.name ?? '',
    city: data.city ?? '',
    country: data.country ?? '',
    image: data.image ?? '',
    pricePerNight: data.pricePerNight ?? 0,
    rating: data.rating ?? 0,
  };
}

export async function getHotelsFromFirebase(): Promise<Hotel[]> {
  const snapshot = await getDocs(collection(db, 'hotels'));
  return snapshot.docs.map(mapHotel);
}

export async function getHotelByIdFromFirebase(hotelId: string): Promise<Hotel | null> {
  const hotelRef = doc(db, 'hotels', hotelId);
  const snapshot = await getDoc(hotelRef);

  if (!snapshot.exists()) {
    return null;
  }

  return mapHotel(snapshot);
}