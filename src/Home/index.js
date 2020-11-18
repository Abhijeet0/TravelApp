/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ListCard from './ListCard';
import BackgroundCurve from '../components/BackgroundCurve';
import { useNavigation } from '@react-navigation/native';
const Home = () => {
  const navigate = useNavigation();
  const [searchText, setSearchText] = useState();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <BackgroundCurve style={styles.svg} />
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            {/* <View style={styles.headerGroupIndicatorLeft}>
              <Feather name="map-pin" color="#fff" size={16} />
              <Text style={styles.headerGroupIndicatorText}>Boston (BOS)</Text>
              <Feather name="chevron-down" color="#fff" size={16} />
            </View> */}
            {/* <View style={styles.headerGroupIndicator}>

             
            </View> */}
            <TouchableOpacity style={styles.headerGroupIndicatorRight} onPress={() => navigate.navigate('Profile')}>
              <FontAwesome name="user-circle" color="#fff" size={35} />
            </TouchableOpacity>
            <Text
              style={styles.heading}>{`Where would \nyou want to go?`}</Text>
            <View style={styles.groupInputContainer}>
              <TouchableOpacity activeOpacity={0.9} style={styles.inputSearchContainer} onPress={() => navigate.navigate("Search")}>
                <TextInput
                  style={styles.inputSearch}
                  placeholder="Search Here..."
                  onChangeText={(value) => setSearchText(value)}
                  editable={false}
                />
                <View
                  style={styles.buttonSearch}
                >
                  <Feather name="search" color="gray" size={16} />
                </View>
              </TouchableOpacity>
              {/* <View style={styles.listBtn}>
                <TouchableOpacity style={styles.button}>
                  <Ionicons name="ios-airplane" color="#fff" size={16} />
                  <Text style={styles.buttonText}>Flights</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: 'transparent' }]}>
                  <FontAwesome name="train" color="#fff" size={16} />
                  <Text style={styles.buttonText}>Train</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
          <View style={{ marginTop: 20, }}>
            <ListCard />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  svg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    marginTop: 22,
    padding: 15,
  },
  headerGroupIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGroupIndicatorLeft: {
    flexDirection: 'row',
  },
  headerGroupIndicatorRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  headerGroupIndicatorText: {
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 5,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 35,
    // width: 2,
  },
  groupInputContainer: {
    marginTop: 20,
    padding: 10,
  },
  inputSearchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
    borderRadius: 25,
  },
  inputSearch: {
    padding: 8,
    fontSize: 16,
    fontWeight: '500',
    color: 'gray',
    flex: 1,
  },
  buttonSearch: {
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 30,
    aspectRatio: 1,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#F88C43',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: '500',
    color: '#fff',
    marginLeft: 10,
  },
  listBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Home;
