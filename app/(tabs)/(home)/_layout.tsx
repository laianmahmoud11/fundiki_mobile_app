import { View } from 'react-native';
import { Stack } from 'expo-router';
import BottomNav from '@/components/common/BottomNav';
import SmallNaviBar from '@/components/common/smallNaviBar';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <SmallNaviBar>
        <></>
      </SmallNaviBar>

      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      <BottomNav navItems={['Home', 'Search', 'Profile']} />
    </View>
  );
}