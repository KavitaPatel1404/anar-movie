import axios from 'axios';
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Constants from '../Constants';

const {
  REQ_STATUS: {INIT, LOADING, API_SUCCESS, SUCCESS, ERROR},
} = Constants;

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [searchStatus, setSearchStatus] = useState(INIT);
  const [data, setData] = useState([]);
  console.log('data: ', data);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onPressSearch = async () => {
    try {
      setSearchStatus(LOADING);
      axios
        .get(`https://www.omdbapi.com/?apikey=4dad5ea8&type=movie&s=${text}`)
        .then(res => {
          console.log('res: ', res.data);
          console.log('res.data.response: ', res.data.Response);
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
    const {Title, Poster, Year} = item;
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
            marginTop: wp(2),
          }}>
          {Title}
        </Text>
        <Text style={{marginTop: wp(2)}}>{Year}</Text>
      </View>
    );
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
        data={data}
        // style={{marginHorizontal: utils.size(16)}}
        columnWrapperStyle={styles.justifySpaceBtwn}
        numColumns={2}
        renderItem={renderMovie}
        keyExtractor={(item, index) => item.imdbID}
        showsVerticalScrollIndicator={false}
        // ItemSeparatorComponent={renderSepartor}
        // ListFooterComponent={renderListFooter}
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
});

export default HomeScreen;
