import axios from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
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
import {EmptyList, Search} from '../../assets/images';
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
      if (!text) {
        setShowError(true);
        setErrorMessage('Please enter a valid movie title to search.');
      } else {
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
            setSearchStatus(ERROR);
          });
      }
    } catch (err) {
      setSearchStatus(ERROR);
    }
  };

  const renderMovie = ({item}) => {
    return <MovieCard movie={item} />;
  };

  const renderEmptyComponent = () => {
    switch (searchStatus) {
      case ERROR:
        return (
          <View style={styles.emptyContainer}>
            <Text>Oops! something went wrong. Please try again.</Text>
          </View>
        );

      case API_SUCCESS:
        return (
          <View style={styles.emptyContainer}>
            <Text style={{fontWeight: '600', fontSize: 16}}>
              No result found
            </Text>
          </View>
        );

      default:
        return (
          <View style={styles.emptyContainer}>
            <EmptyList
              height={wp(70)}
              width={wp(70)}
              style={{marginLeft: wp(10)}}
            />
            <Text style={{fontWeight: '600', fontSize: 16}}>
              Search to find your favourite movies!
            </Text>
          </View>
        );
    }
  };

  const onChangeText = value => {
    setText(value);
    if (showError) {
      setShowError(false);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Text>Search your favourite movies!</Text>
      <View style={[styles.inputContainer, !!showError && styles.errorBorder]}>
        <TextInput
          autoFocus={true}
          style={styles.textInput}
          onChangeText={onChangeText}
          allowFontScaling={false}
          value={text}
          autoCapitalize={true}
          onSubmitEditing={onPressSearch}
        />
        {!!text && (
          <TouchableOpacity
            hitSlop={{top: wp(3), bottom: wp(3), left: wp(3), right: wp(5)}}
            onPress={() => setText('')}
            style={{marginRight: wp(4)}}>
            <Text style={{fontSize: 16}}>x</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onPressSearch} style={styles.search}>
          <Search height={wp(5)} width={wp(5)} fill={'#fff'} />
        </TouchableOpacity>
      </View>
      {showError && <Text style={styles.errText}>{errorMessage}</Text>}

      {searchStatus === LOADING ? (
        <View style={styles.emptyContainer}>
          <Text>Please wait while we find results.</Text>
          <ActivityIndicator size={'large'} style={{marginTop: wp(10)}} />
        </View>
      ) : (
        <FlatList
          data={data}
          style={{marginTop: wp(5)}}
          columnWrapperStyle={styles.justifySpaceBtwn}
          numColumns={2}
          renderItem={renderMovie}
          keyExtractor={(item, index) => item.imdbID}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: wp(5),
    backgroundColor: '#f3f7ff',
  },
  textInput: {flex: 1, padding: 0, height: '100%'},
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#453F62',
    borderRadius: wp(2),
    height: hp(6.5),
    maxHeight: 60,
    paddingLeft: wp(4),
    paddingRight: wp(2),
    marginTop: hp(1),
    backgroundColor: '#ffffff',
  },
  errorBorder: {borderColor: '#F55252'},
  errText: {
    color: '#F55252',
    marginTop: hp(0.5),
  },
  justifySpaceBtwn: {justifyContent: 'space-between'},
  search: {
    backgroundColor: '#6661d2',
    borderRadius: wp(8),
    paddingVertical: wp(2),
    paddingHorizontal: wp(2),
  },
  emptyContainer: {
    marginTop: '20%',
    alignItems: 'center',
  },
});

export default HomeScreen;
