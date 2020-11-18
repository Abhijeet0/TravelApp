import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PermissionsAndroid,
  StatusBar,
  // Animated,
  // Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Animation from 'lottie-react-native';
import anim from './src/assets/splash.json';
import color from './src/styles/color';
import { getCred, getUser, setToken, setUser } from './src/constants/stoarge';
import LottieView from 'lottie-react-native';
import Axios from 'axios';
import AppConfig from './src/constants/AppConfig';
import Geocoder from 'react-native-geocoding';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import AsyncStorage from '@react-native-community/async-storage';

const { height, width } = Dimensions.get('window');

console.disableYellowBox = true;

export default class SplashView extends Component {
  constructor() {
    super();

    this.state = {
      userData: null,
      newUserData: null,
      once: null,
      locationPermission: false,
      subLocality: '',
      city: '',
      state: '',
    };
  }

  async login() {
    await AsyncStorage.removeItem('token');
    var email, pass;
    await getCred().then((state) => {
      (email = state.email), (pass = state.password);
    });
    Axios({
      url: `${AppConfig.apiPath}customer/login?token=true`,
      method: 'POST',
      data: {
        email: email,
        password: pass,
      },
    })
      .then(async (response) => {
        await setUser(response.data);
        await setToken(response.data.token)
        console.log('datatoken', response.data.token);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
  async componentDidMount() {
    this.animation.play(30, 420);
    // navigator.geolocation.clearWatch(this.watchID);
    // await this.requestLocationPermission();
    // if (this.state.locationPermission === true) {
    //   this.getCurrentLocation();
    // }
    await getCred().then((state) => {
      setTimeout(() => {
        if (state) {
          this.login();
          this.props.navigation.navigate('Tabs');
        } else {
          this.props.navigation.navigate('Login');
        }
      }, 3000);
    });
  }

  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
    // LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener.
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Ampra Travels',
          message: 'Ampra Travels access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        this.setState({
          locationPermission: true,
        });
      } else {
        console.log('location permission denied');

        this.setState({
          locationPermission: false,
        });
      }
    } catch (err) {
      this.setState({
        locationPermission: false,
      });

      // console.warn(err)
    }
  }

  // getCurrentLocation() {
  //   this.watchID = Geolocation.watchPosition((position) => {
  //     let region = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //       latitudeDelta: 0.00922 * 1.5,
  //       longitudeDelta: 0.00421 * 1.5,
  //     };
  //     Geocoder.init('AIzaSyCtCVb-Qi0tAtFn82-wGK-Sa1y4yF__xyc');
  //     Geocoder.from(region.latitude, region.longitude).then(async (json) => {
  //       var formatted = json.results;
  //       var components = formatted[0].address_components;
  //       for (var i = 0, component; (component = components[i]); i++) {
  //         for (var j = 0; j < component.types.length; j++) {
  //           if (component.types[j] == 'sublocality_level_1') {
  //             this.setState({
  //               subLocality: component['long_name'],
  //             });
  //           }
  //           if (component.types[j] == 'locality') {
  //             this.setState({
  //               city: component['long_name'],
  //             });
  //           }
  //           if (component.types[j] == 'administrative_area_level_1') {
  //             this.setState({
  //               state: component['long_name'],
  //             });
  //           }
  //         }
  //       }
  //     });
  //   });

  // LocationServicesDialogBox.checkLocationServicesIsEnabled({
  //   message:
  //     "To continue, let your device turn on<br/>location, which uses Google's location<br/>service <a href='#'>Learn more</a>",
  //   ok: 'Yes',
  //   cancel: 'No Thanks',
  //   enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
  //   showDialog: true, // false => Opens the Location access page directly
  //   openLocationServices: true, // false => Directly catch method is called if location services are turned off
  //   preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
  //   preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
  //   providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
  // })
  //   .then(
  //     async function (success) {
  //       console.log('mysuccess', success);
  //       // success => {alreadyEnabled: true, enabled: true, status: "enabled"}
  //       if (success.enabled) {
  //         this.watchID = navigator.geolocation.watchPosition((position) => {
  //           let region = {
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //             latitudeDelta: 0.00922 * 1.5,
  //             longitudeDelta: 0.00421 * 1.5,
  //           };
  //           Geocoder.init('AIzaSyCtCVb-Qi0tAtFn82-wGK-Sa1y4yF__xyc');
  //           Geocoder.from(region.latitude, region.longitude).then(
  //             async (json) => {
  //               var formatted = json.results;
  //               var components = formatted[0].address_components;
  //               for (var i = 0, component; (component = components[i]); i++) {
  //                 for (var j = 0; j < component.types.length; j++) {
  //                   if (component.types[j] == 'sublocality_level_1') {
  //                     this.setState({
  //                       subLocality: component['long_name'],
  //                     });
  //                   }
  //                   if (component.types[j] == 'locality') {
  //                     this.setState({
  //                       city: component['long_name'],
  //                     });
  //                   }
  //                   if (component.types[j] == 'administrative_area_level_1') {
  //                     this.setState({
  //                       state: component['long_name'],
  //                     });
  //                   }
  //                 }
  //               }
  //             },
  //           );
  //         });
  //       }
  //     }.bind(this),
  //   )
  //   .catch((error) => {
  //     console.log('locationbox', error.message); // error.message => "disabled"
  //   });
  // }

  render() {
    return (
      <LinearGradient
        colors={['#ffffff', '#ffffff', color.orange]}
        style={styles.container}>
        <StatusBar
          backgroundColor={'#ffffff'}
          barStyle={'dark-content'}
          translucent={false}
        />

        <View
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <View style={styles.circle}>
            <Image
              source={require('./src/assets/logo.jpg')}
              style={{ borderRadius: 150 / 2, width: 150, height: 150 }}
            />
          </View>
          <Text
            style={{
              color: color.orange,
              fontSize: 25,
              fontWeight: 'bold',
              alignItems: 'center',
              justifyContent: 'center',
              letterSpacing: 1,
            }}>
            Ampra Travels
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <LottieView
            ref={(animation) => {
              this.animation = animation;
            }}
            style={{
              width: 80,
              height: 80,
            }}
            autoPlay
            loop
            source={require('./src/assets/splash.json')}
          />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: '#FFFFFF',
    elevation: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// #1da1f2
