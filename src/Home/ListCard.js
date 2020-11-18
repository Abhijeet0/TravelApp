import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AppConfig from '../constants/AppConfig';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from '@react-navigation/compat';

const W = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 20,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
  },
  itemImage: {
    width: W,
    height: (W - 40) / 2 + 30,
    backgroundColor: 'gray',
  },
  itemContainer: {
    // marginRight: 20,
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
  itemPriceOriginal: {
    color: 'gray',
    fontWeight: '500',
    fontSize: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemInner: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'flex-end',
  },
  imageBg: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemTime: {
    color: '#eee',
    fontWeight: '600',
    fontSize: 15,
  },
  itemSaleOff: {
    fontWeight: 'bold',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    paddingHorizontal: 10,
  },
});

class ListCard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  getPackages() {
    axios({
      url: `${AppConfig.apiPath}products`,
      method: 'GET',
    })
      .then(async (response) => {
        this.setState({
          data: response.data.data,
        });
        console.log('Response', response.data);
      })
      .catch((err) => { });
  }

  componentDidMount() {
    this.getPackages();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>Tour Packages</Text>
          {/* <Text style={[styles.textHeader, {color: '#FB7200'}]}>
          VIEW ALL (12)
        </Text> */}
        </View>
        <ScrollView>
          {this.state.data.length > 0 &&
            this.state.data.map((item) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.itemContainer}
                  onPress={() =>
                    this.props.navigation.navigate('PackageDetails', {
                      item: item,
                    })
                  }>
                  <View style={styles.imageBg}>
                    <Image
                      source={{ uri: item.base_image.original_image_url }}
                      style={styles.itemImage}
                    />
                    <View style={styles.itemInner}>
                      <View>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.itemTime}>
                            {item.reviews.average_rating}
                          </Text>
                          <Icon
                            name={'star'}
                            color="#FFFF00"
                            size={10}
                            style={{ marginLeft: 10 }}
                          />
                        </View>
                      </View>
                      {/* <View style={{borderRadius: 30, overflow: 'hidden'}}>
                    <Text style={styles.itemSaleOff}>{item.saleoff}</Text>
                  </View> */}
                    </View>
                  </View>
                  <Text style={styles.itemPrice}>
                    {item.formated_price}
                    {/* <Text style={styles.itemPriceOriginal}> ({item.price})</Text> */}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(ListCard);
