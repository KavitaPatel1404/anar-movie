import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import Constants from '../../Constants';
import MovieCard from './MovieCard';

const {
  REQ_STATUS: {INIT, LOADING, API_SUCCESS, SUCCESS, ERROR},
} = Constants;

const ShortlistedMovies = () => {
  const dispatch = useDispatch();

  const shortlisted = useSelector(({movies}) => {
    return movies.shortlisted;
  }, shallowEqual);

  const renderMovie = ({item}) => {
    return <MovieCard movie={item} />;
  };

  const renderEmptyComponent = () => {
    return <View />;
  };
  return (
    <View style={styles.mainContainer}>
      <Text>Your favourites!</Text>

      <FlatList
        style={{paddingBottom: hp(10)}}
        data={shortlisted}
        columnWrapperStyle={styles.justifySpaceBtwn}
        numColumns={2}
        renderItem={renderMovie}
        keyExtractor={(item, index) => item.imdbID}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: wp(5),
  },
  textInput: {flex: 1, padding: 0, height: '100%'},
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: wp(2),
    height: hp(8),
    maxHeight: 60,
    paddingHorizontal: wp(4),
    marginTop: hp(1),
    backgroundColor: '#ffffff',
  },
  errorBorder: {borderColor: '#F55252'},
  errText: {
    color: '#F55252',
    marginTop: hp(0.5),
  },
  justifySpaceBtwn: {justifyContent: 'space-between'},
  verticalListItem: {
    backgroundColor: '#ffffff',
    marginVertical: wp(2),
    width: '48%',
    borderRadius: 12,
    padding: 12,
  },
  productImage: {
    height: wp(30),
    width: '100%',
    resizeMode: 'contain',
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default ShortlistedMovies;
