import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, ShortlistedMovies} from './src/modules/movies';
import home from './src/assets/images/home.png';
import bookmark from './src/assets/images/bookmark.png';
import {Provider} from 'react-redux';
import store from './src/store';
import {Image} from 'react-native';
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
              tabBarIcon: () => (
                <Image source={home} style={{height: wp(5), width: wp(5)}} />
              ),
            }}
          />
          <Tab.Screen
            name="Shortlisted"
            component={ShortlistedMovies}
            options={{
              tabBarIcon: () => (
                <Image
                  source={bookmark}
                  style={{height: wp(5), width: wp(5)}}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
