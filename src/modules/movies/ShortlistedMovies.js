import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {shallowEqual, useSelector} from 'react-redux';
import {EmptyList} from '../../assets/images';
import MovieCard from './MovieCard';

const ShortlistedMovies = () => {
  const shortlisted = useSelector(({movies}) => {
    return movies.shortlisted;
  }, shallowEqual);

  const renderMovie = ({item}) => {
    return <MovieCard movie={item} isShortlisted />;
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <EmptyList height={wp(70)} width={wp(70)} style={{marginLeft: wp(8)}} />
        <Text style={{fontWeight: '600', fontSize: 16}}>
          No movies Shortlisted
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Text>Your favourites!</Text>
      <FlatList
        style={{marginTop: wp(5)}}
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
  mainContainer: {flex: 1, padding: wp(5), backgroundColor: '#f3f7ff'},
  justifySpaceBtwn: {justifyContent: 'space-between'},
  emptyContainer: {
    marginTop: '20%',
    alignItems: 'center',
  },
});

export default ShortlistedMovies;
