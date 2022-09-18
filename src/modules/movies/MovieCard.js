import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {Bookmark} from '../../assets/images';
import {updateShortlistedMovies} from './MoviesActions';

const MovieCard = ({movie, isShortlisted}) => {
  const dispatch = useDispatch();

  const shortlisted = useSelector(({movies}) => {
    return movies.shortlisted;
  }, shallowEqual);

  const {Title, Poster, Year} = movie;

  const isAdded = useMemo(() => {
    return isShortlisted || shortlisted.some(m => m.imdbID === movie.imdbID);
  }, [isShortlisted, shortlisted, movie.imdbID]);

  const onPress = () => dispatch(updateShortlistedMovies(movie));

  return (
    <View style={styles.verticalListItem}>
      <View style={styles.image}>
        <Image source={{uri: Poster}} style={styles.productImage} />
      </View>
      <Text
        style={{
          marginTop: wp(3),
        }}>
        {Title}
      </Text>
      <View style={styles.bottomContainer}>
        <Text style={{marginTop: wp(2)}}>{Year}</Text>
        <TouchableOpacity onPress={onPress}>
          <Bookmark
            height={wp(5)}
            width={wp(5)}
            fill={isAdded ? '#c74343' : '#fff'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  verticalListItem: {
    backgroundColor: '#ffffff',
    marginVertical: wp(2),
    width: '48%',
    borderRadius: 12,
    padding: 12,
  },
  image: {
    height: wp(30),
    width: '100%',
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

export default React.memo(MovieCard);
