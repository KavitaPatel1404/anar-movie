import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ShortlistedMovies = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F8F8F8',
    // height: hp("100"),
    // width: wp("100"),
    display: 'flex',
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: '#FFFFFF',
    // height: hp("50"),
    // width: wp("90"),
    alignSelf: 'center',
    padding: 20,
  },
  flexDirectionRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  logoContainer: {
    justifyContent: 'center',
  },
  logo: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logoText: {
    height: 35,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 10,
  },
  bottomLineOfLogo: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderStyle: 'dashed',
    borderRadius: 0.2,
  },
});

export default ShortlistedMovies;
