import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../contents/colors';
import { getFontFamily } from '../utils/fontFamily';

import DashboardScreen from '../screens/MainFlow/DashboardScreen/DashboardScreen';
import WalletScreen from '../screens/MainFlow/DashboardScreen/WalletScreen';
import OrderScreen from '../screens/MainFlow/DashboardScreen/OrderScreen';
import ProfileScreen from '../screens/MainFlow/DashboardScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainFlow = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 110,
          backgroundColor: Colors.purple500,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: Colors.primary700,
        tabBarInactiveTintColor: Colors.primaryWhite,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: getFontFamily('medium'),
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Wallet') iconName = 'wallet-outline';
          else if (route.name === 'Orders') iconName = 'document-text-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';

          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainFlow;
