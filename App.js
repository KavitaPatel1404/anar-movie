import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, ShortlistedMovies} from './src/modules/movies';
import {Home, Bookmark} from './src/assets/images';
import {Provider} from 'react-redux';
import store from './src/store';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarActiveTintColor: '#6661d2',
              tabBarIcon: ({color}) => (
                <Home height={wp(5)} width={wp(5)} fill={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Shortlisted"
            component={ShortlistedMovies}
            options={{
              tabBarActiveTintColor: '#6661d2',
              tabBarIcon: ({color}) => (
                <Bookmark
                  height={wp(5)}
                  width={wp(5)}
                  fill={'#fff'}
                  stroke={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
