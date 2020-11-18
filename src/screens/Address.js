import Axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AppConfig from '../constants/AppConfig';
import { getCookie, getToken, getUser } from '../constants/stoarge';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Loader from './../components/Loader';
import RazorpayCheckout from 'react-native-razorpay';

export default class Address extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      token: null,
      price: null,
      loadingVisible: false
    };
  }

  async getAllAddresses(token) {
    Axios({
      url: `${AppConfig.apiPath}addresses?token=${token}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        this.setState({
          data: res.data.data,
        });
      })
      .catch((err) => {
      });
  }
  async componentDidMount() {
    await getToken().then((state) => {
      this.getAllAddresses(state);
      this.setState({
        token: state
      })
    });
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      async () => {
        await getToken().then((state) => {
          this.getAllAddresses(state);
          this.setState({
            token: state
          })
        });
      }
    );
  }
  // saveOrder() {
  //   Axios({
  //     url: `${AppConfig.apiPath}checkout/save-order?token=${this.state.token}`,
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => {
  //       console.log("resorder", res.data)
  //     })
  //     .catch((err) => {
  //       console.log("responseeerrorder", err)

  //     });
  // }
  postPayment(pay_id, order_id) {
    let data = {
      "payment_id": pay_id,
      "order_id": order_id
    }
    Axios({
      url: `${AppConfig.apiPath}razorpay/standard/payment?token=${this.state.token}`,
      method: 'POST',
      data: data,
    })
      .then((response) => {
        Alert.alert('Ampra Travels', 'Thanks for order', [
          {
            text: "Ok",
            onPress: () => this.props.navigation.navigate("Explore")
          }
        ]);
        console.log('res', response.data);
      })
      .catch((err) => {
        console.log('err', err);
        Alert.alert('Ampra Travels', 'Please try again later');
      });
  }
  checkout(price, order_id) {
    var options = {
      description: '',
      image:
        'https://ampra.in//storage/app/public/site-settings/August2020/8qaUn7SB2KmD8n9yaMvZ.png',
      currency: 'INR',
      key: 'rzp_test_wpYNnqUEdwnSwD', // Your api key
      amount: price * 100,
      name: 'Ampra Travels',
      prefill: {
        email: '',
        contact: '',
        name: '',
      },
      theme: { color: "#FFA500" },
    };
    return RazorpayCheckout.open(options)
      .then((data) => {
        this.postPayment(data.razorpay_payment_id, order_id);
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure
        alert(`Payment Failed. Please try again later.`);
      });
  }

  initiallizePayment() {
    Axios({
      url: `${AppConfig.apiPath}razorpay/standard/init?token=${this.state.token}`,
      method: 'GET',
    })
      .then((response) => {
        console.log('resinit', response.data);
        this.setState({
          loadingVisible: false
        })
        this.checkout(parseInt(response.data.data.items[0].price), response.data.data.order_id)
      })
      .catch((err) => {
        console.log('errrinit', err);
      });
  }
  savePayment() {
    let data = {
      "payment": {
        "method": "Razorpay"
      }
    }
    Axios({
      url: `${AppConfig.apiPath}checkout/save-payment?token=${this.state.token}`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then((res) => {
        console.log("respaymethod", res.data)

        this.initiallizePayment()
        this.setState({
          price: res.data.grand_total
        })
      })
      .catch((err) => {
        console.log("responseeerr", err)

      });
  }
  saveShiping() {
    let data = {
      "shipping_method": "free_free"
    }
    Axios({
      url: `${AppConfig.apiPath}checkout/save-shipping?token=${this.state.token}`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then((res) => {
        console.log("resshippp", res.data)
        this.savePayment()
      })
      .catch((err) => {
        console.log("responseeerr", err)

      });
  }
  saveAddressToCart(item) {
    this.setState({
      loadingVisible: true
    })

    let data = {
      "billing": {
        "address1": {
          "0": item.address1[0]
        },
        "use_for_shipping": "false",
        "first_name": item.first_name,
        "last_name": item.last_name,
        "email": item.email,
        "address_id": item.id
      },
      "shipping": {
        "address1": {
          "0": item.address1[0]
        },
        "first_name": item.first_name,
        "last_name": item.last_name,
        "email": item.email,
        "address_id": item.id
      }
    };
    Axios({
      url: `${AppConfig.apiPath}checkout/save-address?token=${this.state.token}`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then((res) => {
        this.saveShiping()
      })
      .catch((err) => {
        console.log("responseeerr", err)

      });
  }

  ItemView(item) {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => this.saveAddressToCart(item)}>
        <Text style={styles.itemPrice}>
          {item.first_name + ' ' + item.last_name}
        </Text>
        <View style={styles.itemFooter}>
          {/* <Text style={styles.itemText}>
            <Ionicons name="ios-calendar" style={styles.icon} />
            {'  '}
            {item.time}
          </Text> */}
          <Text style={styles.itemText}>
            {item.address1[0] + ', ' + item.postcode + '\nContact: ' + item.phone}
          </Text>

          {/* <Text style={styles.itemText}>
            <Ionicons name="ios-star" style={styles.icon} /> {'  '}
            {item.rating}
          </Text> */}
        </View>
        {/* <Text style={styles.saleoff}>{item.saleoff}%</Text> */}
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.itemContainer, { marginTop: 20 }]}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => { this.props.navigation.navigate("New Address") }}>
            <FontAwesome name="plus-square-o" style={styles.icon} color="black" size={25} />
            <Text style={[styles.itemPrice, { alignSelf: 'center' }]}>Add new Address</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          {this.state.data &&
            this.state.data.length > 0 &&
            this.state.data.reverse().map((v, i) => {
              return (
                this.ItemView(v)
              );
            })}
        </ScrollView>
        <View>
          <Loader
            modalVisible={this.state.loadingVisible}
            animationType="fade"
          />
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',

  },
  itemContainer: {
    borderWidth: 1.5,
    borderColor: '#EFEFF0',
    marginBottom: 12,
    padding: 20,
    borderRadius: 12,
  },

  itemText: {
    color: '#24333A',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0D1820',
    marginBottom: 10,
    justifyContent: 'center'
  },
  itemPriceOri: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#828595',
    textDecorationLine: 'line-through',
  },
  containerBody: {
    marginTop: 15,
  },
  icon: {
    marginRight: 10,
    justifyContent: 'center'
  },
  saleoff: {
    position: 'absolute',
    backgroundColor: '#FFF0E8',
    color: '#FF702A',
    fontWeight: 'bold',
    padding: 6,
    borderRadius: 10,
    paddingHorizontal: 10,
    right: -10,
    top: 10,
  },
});
