import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  Image,
  PermissionsAndroid
} from 'react-native';
import Loader from '../components/Loader';
import colors from '../styles/color';
import InputField from '../components/InputField';
import NextArrowButton from '../components/NextArrowButton';
import axios from 'axios';
import AppConfig from '../constants/AppConfig';
import ImagePicker from "react-native-image-picker";
import { setDP } from './../constants/stoarge';

export default class Registration extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      firstName: null,
      lastName: null,
      email: '',
      password: '',
      formValid: true,
      error: '',
      loadingVisible: false,
      emailError: null,
      emailValidate: false,
      confirmPassError: null,
      fnameError: null,
      lnameError: null,
      passError: null,
      avatarSource: null,
      sendAvatar: null
    };
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    // ImagePicker invoked, picking an image
    ImagePicker.showImagePicker(options, (response) => {
      // Logging various errors/ cancels for the ImagePicker
      if (response.didCancel) {
        console.log('resdid', response.didCancel)
      } else if (response.error) {
        console.log('reserror', response.error)
        this.requestPermission()
      } else if (response.customButton) {
        console.log('rescustomButton', response.customButton)

      } else {
        console.log('uri', response)
        // Saving the URI from response as a variable and a state (state is used in render)
        const source = { uri: response.uri };
        this.setState({
          avatarSource: source,
          sendAvatar: response.data,
        });
        // fetch needs the source as a string, but "source" is an object

        // Creating new FormData for the image upload
      }
    });
  }

  handleCloseNotification = () => {
    this.setState({ formValid: true });
  };

  _onProcessTextChangeEmail(fname, lname, pass, confirmPassword) {
    if (!fname) {
      this.setState({
        fnameError: '* First Name required',
      });
    } else if (!lname) {
      this.setState({
        lnameError: '* Last Name required',
      });
    } else if (!pass) {
      this.setState({
        passError: '* Password required',
      });
    } else if (
      !this.state.fnameError &&
      !this.state.lnameError &&
      !this.state.passError &&
      !this.state.confirmPassError
    ) {
      {
        this.Register();
      }

      this.setState({
        fnameError: '',
        lnameError: '',
        emailError: '',
        confirmPassError: '',
      });
    }
  }

  Register = async () => {
    if (this.state.sendAvatar && this.state.email && this.state.firstName && this.state.lastName && this.state.password) {
      this.setState({ loadingVisible: true });
      const form = new FormData();
      form.append('email', this.state.email);
      form.append('first_name', this.state.firstName);
      form.append('last_name', this.state.lastName);
      form.append('password', this.state.password);
      form.append('password_confirmation', this.state.password);
      await axios({
        url: `${AppConfig.apiPath}customer/register`,
        method: 'POST',
        data: form,
      })
        .then(async (response) => {
          this.setState({ loadingVisible: false });
          ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
          this.props.navigation.navigate('Login');
          // setUser()
          await setDP(this.state.sendAvatar)
        })
        .catch((err) => {
          this.setState({ loadingVisible: false });
          Alert.alert('Ampra Travel', 'Please try again later');
        });
    } else {
      Alert.alert("Ampra Travels", "All fields are mendatory");
    }
  };
  async requestPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,

        {
          title: "Take Photo Permission",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("granted", granted)
      } else {
        console.log("nogranted", granted)

      }
    } catch (err) {
      console.log("errorrpermi", err)

    }
  }
  componentDidMount() {
    this.requestPermission()
  }
  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }
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

  handleFirstNameChange = (firstName) => {
    // parent class change handler is always called with field name and value
    this.setState({ firstName: firstName, fnameError: '' });
  };
  handleLastNameChange = (lastName) => {
    // parent class change handler is always called with field name and value
    this.setState({ lastName: lastName, lnameError: '' });
  };
  // handleEmailChange = (email) => {
  //   // parent class change handler is always called with field name and value
  //   this.setState({email: email});
  // };
  handlePasswordChange = (password) => {
    // parent class change handler is always called with field name and value
    const reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password === null) {
      this.setState({
        passError: '* Please enter password',
      });
      return false;
    } else {
      this.setState({
        passError: '',
        password: password,
      });
    }
  };
  handleConfirmPasswordChange = (confirm_password) => {
    const { password } = this.state;
    // perform all neccassary validations
    if (password !== confirm_password) {
      this.setState({
        confirmPassError: "Password don't match",
      });

      return false;
    } else {
      this.setState({
        confirmPassError: '',
      });

      return true;
    }
  };

  static navigationOptions = {
    header: null,
  };
  render() {
    const { formValid, loadingVisible, avatarSource, sendAvatar } = this.state;
    const showNotification = formValid ? false : true;
    const bgColor = formValid ? colors.white : colors.darkOrange;
    return (
      <ScrollView style={[{ backgroundColor: bgColor }, styles.wrapper]}>
        {/* <BackgroundCurve style={styles.svg} /> */}

        <KeyboardAvoidingView style={styles.scrollView}>
          <Text style={styles.loginHeader}>Sign Up</Text>
          <TouchableOpacity
            onPress={() => {
              this.selectPhotoTapped();
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 20
            }}
          >
            <Image
              source={
                avatarSource
                  ? avatarSource

                  : require("./../assets/user.png")
              }
              style={{ width: 120, height: 120, borderRadius: 150 / 2 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                paddingTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Take Photo
            </Text>
          </TouchableOpacity>
          <InputField
            labelText="First Name"
            onChangeText={this.handleFirstNameChange}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            inputType={'email'}
            borderBottomColor={colors.black}
            customStyle={{ marginBottom: 30 }}
          />
          {!!this.state.fnameError && (
            <Text style={{ color: 'red', marginLeft: 20 }}>
              {this.state.fnameError}
            </Text>
          )}
          <InputField
            labelText="Last Name"
            onChangeText={this.handleLastNameChange}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="email"
            customStyle={{ marginBottom: 30 }}
          />
          {!!this.state.lnameError && (
            <Text style={{ color: 'red', marginLeft: 20 }}>
              {this.state.lnameError}
            </Text>
          )}
          <InputField
            labelText="Email Address"
            onChangeText={this.validate}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="email"
            customStyle={{ marginBottom: 30 }}
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
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="password"
            customStyle={{ marginBottom: 30 }}
          />
          {!!this.state.passError && (
            <Text style={{ color: 'red', marginLeft: 20 }}>
              {this.state.passError}
            </Text>
          )}
          <InputField
            labelText="Confirm Password"
            onChangeText={this.handleConfirmPasswordChange}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="password"
            customStyle={{ marginBottom: 30 }}
          />
          {!!this.state.confirmPassError && (
            <Text style={{ color: 'red', marginLeft: 20 }}>
              {this.state.confirmPassError}
            </Text>
          )}
        </KeyboardAvoidingView>
        <View style={{ marginTop: 50 }}>
          <View style={styles.nextButtonWrapper}>
            <NextArrowButton
              handelPress={() => {
                this._onProcessTextChangeEmail(
                  this.state.firstName,
                  this.state.lastName,
                  this.state.password,
                  this.state.password,
                );
              }}
            />
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
              {'Already have an account ? '}
              <Text
                onPress={() => this.props.navigation.navigate('Login')}
                style={{
                  color: colors.blue,
                  fontSize: 16,
                }}>
                Login here
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
    marginTop: 10,
    // height: Dimensions.get('window').height,
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
  },
  loginHeader: {
    fontSize: 28,
    color: colors.black,
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
