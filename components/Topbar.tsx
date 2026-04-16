import { colors } from '@/constants/theme';
import { router } from 'expo-router';
import * as React from 'react';
import { Appbar } from 'react-native-paper';
const TopBarNavigation = () => (
  <Appbar.Header style={{backgroundColor:colors.secondary,}}>
    <Appbar.BackAction onPress={() => {router.back()}} />
  </Appbar.Header>
);

export default TopBarNavigation;