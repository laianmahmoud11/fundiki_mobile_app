import { styles } from '@/styles/homeStyles';
import { Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

function BottomBarIcon({
  item,
  active,
}: {
  item: string;
  active: boolean;
}) {
  const color = active ? '#1F4FFF' : '#101010';
  const size = 31;

  if (item === 'Home') {
    return <Feather name="home" size={size} color={color} />;
  }

  if (item === 'Favorite') {
    return <Feather name="heart" size={size - 1} color={color} />;
  }

  if (item === 'MyBooking') {
    return <SimpleLineIcons name="briefcase" size={size - 1} color={color} />;
  }

  return <Ionicons name="person-circle-outline" size={size + 2} color={color} />;
}

type BottomNavProps = {
  navItems: string[];
  activeItem?: string;
};

export default function BottomNav({
  navItems,
  activeItem = 'Search',
}: BottomNavProps) {
  const router = useRouter();

  function handleNavigation(item: string) {
    if (item === 'Home') {
      router.push('/HomeScreen');
    }

   

   
     if (item === 'MyBooking') {
      router.push('/');
    }
    
  }

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.navItem}
          activeOpacity={0.85}
          onPress={() => handleNavigation(item)}
        >
          <BottomBarIcon item={item} active={item === activeItem} />
          <Text
            style={[styles.navLabel, item === activeItem ? styles.navLabelActive : null]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}