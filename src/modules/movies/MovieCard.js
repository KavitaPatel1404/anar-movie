import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import bookmark from '../../assets/images/bookmark.png';

import Constants from '../../Constants';
import {updateShortlistedMovies} from './MoviesActions';

const {
  REQ_STATUS: {INIT, LOADING, API_SUCCESS, SUCCESS, ERROR},
} = Constants;

const MovieCard = ({movie}) => {
  const dispatch = useDispatch();

  const {Title, Poster, Year} = movie;
  const onPress = () => dispatch(updateShortlistedMovies(movie));

  return (
    <View style={styles.verticalListItem}>
      <View
        style={{
          height: wp(30),
          width: '100%',
        }}>
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
          <Image source={bookmark} style={{height: wp(4), width: wp(4)}} />
        </TouchableOpacity>
      </View>
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

export default MovieCard;
