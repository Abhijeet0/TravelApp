import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import Loader from '../components/Loader';
import colors from '../styles/color';
import InputField from '../components/InputField';
import NextArrowButton from '../components/NextArrowButton';
import BackgroundCurve from '../components/BackgroundCurve';
import AppConfig from '../constants/AppConfig';
import axios from 'axios';
import { setCookie, setCred, setToken, setUser } from '../constants/stoarge';
import CookieManager from 'react-native-cookies';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      email: '',
      password: '',
      formValid: true,
      error: '',
      loadingVisible: false,
      emailError: null,
      emailValidate: false,
      passError: '',
    };
  }

  handleCloseNotification = () => {
    this.setState({ formValid: true });
  };

  validate = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log("Email is Not Correct");
      this.setState({
        email: text,
        emailError: 'Please enter valid email',
        emailValidate: false,
      });
      return false;
    } else {
      this.setState({ email: text, emailError: '', emailValidate: true });
      // console.log("Email is Correct");
    }
  };

  Login = () => {
    if (this.state.password && this.state.email) {
      this.setState({ loadingVisible: true });
      const form = new FormData();
      form.append('email', this.state.email);
      form.append('password', this.state.password);

      axios({
        url: `${AppConfig.apiPath}customer/login?token=true`,
        method: 'POST',
        data: form,
      })
        .then(async (response) => {

          this.setState({ loadingVisible: false });
          await setUser(response.data);
          await setToken(response.data.token)
          setCred({
            email: this.state.email,
            password: this.state.password,
          });
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          this.props.navigation.navigate('Tabs');
        })
        .catch((err) => {
          this.setState({ loadingVisible: false });
          Alert.alert('Ampra Travel', 'Please try again later');
        });
    } else {
      Alert.alert('Ampra Travel', 'Invalid credentials');
    }
  };
  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }
  handleEmailChange = (email) => {
    // parent class change handler is always called with field name and value
    this.setState({ email: email });
  };
  handlePasswordChange = (password) => {
    // parent class change handler is always called with field name and value
    this.setState({ password: password, passError: '' });
  };
  static navigationOptions = {
    header: null,
  };

  render() {
    const { formValid, loadingVisible } = this.state;
    const showNotification = formValid ? false : true;
    const bgColor = formValid ? colors.white : colors.darkOrange;
    return (
      <ScrollView style={[{ backgroundColor: bgColor }, styles.wrapper]}>
        <BackgroundCurve style={styles.svg} />

        <KeyboardAvoidingView style={styles.scrollView}>
          <Text style={styles.loginHeader}>Login</Text>
          <InputField
            labelText="Email Address"
            onChangeText={this.validate}
            labelTextSize={14}
            labelColor={colors.white}
            textColor={colors.white}
            borderBottomColor={colors.white}
            inputType="email"
            customStyle={{ marginBottom: 20 }}
            showCheckmark={'email' === 'test@gmail.com'}
          />
          {!!this.state.emailError && (
            <Text style={{ color: 'red', marginLeft: 20 }}>
              {this.state.emailError}
            </Text>
          )}
          <InputField
            labelText="Password"
            onChangeText={this.handlePasswordChange}
            labelTextSize={14}
            labelColor={colors.white}
            textColor={colors.white}
            borderBottomColor={colors.white}
            inputType="password"
            customStyle={{ marginBottom: 30 }}
            showCheckmark={'password' === '12345'}
          />
        </KeyboardAvoidingView>
        <View style={{ marginTop: 140 }}>
          <View style={styles.nextButtonWrapper}>
            <NextArrowButton handelPress={this.Login} />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 20,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {"Don't have an account ? "}
              <Text
                onPress={() => this.props.navigation.navigate('Registration')}
                style={{
                  color: colors.blue,
                  fontSize: 16,
                }}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
        <View>
          <Loader modalVisible={loadingVisible} animationType="fade" />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    // display: 'flex',
    flex: 1,
    height: Dimensions.get('window').height,
  },
  svg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  scrollView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1,
    marginTop: 70,
    // height: Dimensions.get('window').height,
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
  },
  loginHeader: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  notificationWrapper: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
  },
  nextButtonWrapper: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 30,
  },
});
