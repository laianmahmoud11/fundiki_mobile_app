import HomeHeader from '@/components/home/HomeHeader';
import HomeSections from '@/components/home/HomeSections';
import InputSearch from "@/components/ui/inputSearch";

import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  deals,
  ideas
} from '../../../data/homeData';

import {
  getPopularCapitalHotels,
  getWeekendDeals,
  searchHotels,
} from '@/services/hotelService';
import { styles } from '@/styles/homeStyles';
import { getRandomItems } from '@/utils/contentHelpers';
import { buildSearchFilters } from '@/utils/searchHelpers';
import { router } from 'expo-router';

const HomeScreen = () => {
  const [destination, setDestination] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [weekendDeals, setWeekendDeals] = useState([]);
  const [popularHotels, setPopularHotels] = useState([]);
  const [randomDeals, setRandomDeals] = useState([]);
  const [randomIdeas, setRandomIdeas] = useState([]);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const dealsData = await getWeekendDeals();
        const popularHotelsData = await getPopularCapitalHotels();

        setWeekendDeals(dealsData);
        setPopularHotels(popularHotelsData);
      } catch (error) {
        setWeekendDeals([]);
        setPopularHotels([]);
      }

      setRandomDeals(getRandomItems(deals, 2));
      setRandomIdeas(getRandomItems(ideas, 3));
    }

    loadHomeData();
  }, []);

  async function handleSearch() {
    const filters = buildSearchFilters({
      destination,
    });

    try {
      setIsSearching(true);
      const results = await searchHotels(filters);

      Alert.alert(
        'Search completed',
        `Found ${results.length} hotel(s). Later, these results can be shown on Mohammad's page.`,
      );
    } catch (error) {
      Alert.alert(
        'Connection error',
        'Make sure Firebase is set up correctly, then try again.',
      );
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      

      <View style={styles.screen}>
        <HomeHeader />
<InputSearch  placeholder={"search" }  onFocus={()=>{   router.push('/hotelList');}}   />
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          

          <HomeSections
            deals={randomDeals}
            weekendDeals={weekendDeals}
            popularHotels={popularHotels}
            ideas={randomIdeas}
          />
        </ScrollView>

        
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;