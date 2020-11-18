import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { View } from 'react-native';
import Home from './src/Home';
import Login from './src/Authentication/Login';
import Registration from './src/Authentication/Registration';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';

import Search from './src/screens/Search';
import { getUser } from './src/constants/stoarge';
import SplashView from './SpashScreen';
import PackageDetails from './src/screens/PackageDetails';
import ListCard from './src/Home/ListCard';
import Enquiry from './src/screens/Enquiry';
import Address from './src/screens/Address';
import AddAddress from './src/screens/AddAddress';
import Profile from './src/screens/Profile';
import History from './src/screens/History';
import HistoryPackageDetails from './src/screens/HistoryPkgDetails';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Blank = () => {
  return <View />;
};

function Tabs() {
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Explore') {
        iconName = 'home';
      } else if (route.name === 'History') {
        iconName = 'history';
      } else if (route.name === 'Enquiry') {
        iconName = 'info-with-circle';
      } else if (route.name === 'Notification') {
        iconName = 'bell';
      }

      // You can return any component that you like here!
      if (iconName === 'history') {
        return <Icon name={iconName} size={size} color={color} />;
      }
      return <Entypo name={iconName} size={size} color={color} />;
    },
  });

  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: '#FB7200',
        inactiveTintColor: '#464962',
      }}>
      <Tab.Screen name="Explore" component={Home} />
      <Tab.Screen name="Enquiry" component={Enquiry} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Notification" component={Blank} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={SplashView}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Tabs"
          component={Tabs}
        />
        <Stack.Screen name="ListCard" component={ListCard} />
        <Stack.Screen
          name="PackageDetails"
          component={PackageDetails}
          options={({ route }) => ({
            title: '',
            headerTitleStyle: {
              fontSize: 14,
              marginLeft: 0,
            },
          })}
        />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="New Address" component={AddAddress} />
        <Stack.Screen options={({ route }) => ({
          title: 'Details',
        })} name="HistoryPkg" component={HistoryPackageDetails} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({ route }) => ({
            title: 'Profile',
            headerTitleStyle: {
              fontSize: 14,
              marginLeft: 0,
            },
          })}
        />
        <Stack.Screen options={{ headerShown: false }} name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
