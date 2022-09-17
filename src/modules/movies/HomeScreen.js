import axios from 'axios';
import React, {useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Constants from '../../Constants';
import MovieCard from './MovieCard';

const {
  REQ_STATUS: {INIT, LOADING, API_SUCCESS, ERROR},
} = Constants;

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [searchStatus, setSearchStatus] = useState(INIT);
  const [data, setData] = useState([]);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onPressSearch = async () => {
    try {
      setSearchStatus(LOADING);
      axios
        .get(`https://www.omdbapi.com/?apikey=4dad5ea8&type=movie&s=${text}`)
        .then(res => {
          if (res.data.Response) {
            setData(res.data.Search);
          }
          setSearchStatus(API_SUCCESS);
        })
        .catch(error => {
          console.log(error);
          setSearchStatus(ERROR);
        });
    } catch (err) {
      setSearchStatus(ERROR);
    }
  };

  const renderMovie = ({item}) => {
    return <MovieCard movie={item} />;
  };

  const renderEmptyComponent = () => {
    return <View />;
  };
  return (
    <View style={styles.mainContainer}>
      <Text>Search your favourite movies!</Text>
      <View style={[styles.inputContainer, !!showError && styles.errorBorder]}>
        <TextInput
          autoFocus={true}
          style={styles.textInput}
          onChangeText={t => setText(t)}
          allowFontScaling={false}
          value={text}
          autoCapitalize={true}
          onSubmitEditing={onPressSearch}
        />
        {!!text && (
          <TouchableOpacity
            hitSlop={{top: wp(3), bottom: wp(3), left: wp(3), right: wp(5)}}
            onPress={() => setText('')}>
            <Text>x</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.errText}>{errorMessage}</Text>

      <Button title="Search" onPress={onPressSearch} />
      <FlatList
        style={{paddingBottom: hp(10)}}
        data={data}
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

export default HomeScreen;
