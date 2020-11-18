import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import InputField from '../components/InputField';
import colors from '../styles/color';
import RadioGroup from 'react-native-radio-button-group';
import Axios from 'axios';
import AppConfig from '../constants/AppConfig';
import Loader from './../components/Loader';

const {width, height} = Dimensions.get('window');

export default class Enquiry extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: null,
      name: '',
      email: '',
      pno: '',
      dest: '',
      nop: 0,
      noc: 0,
      nod: 0,
      meal: '',
      budget: '',
      loadingVisible: false,
    };
  }
  postData() {
    let data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.pno,
      destination: this.state.dest,
      budget: this.state.budget,
      no_of_pass: this.state.nop,
      no_of_childs: this.state.noc,
      no_of_days: this.state.nod,
      meal_plan: this.state.meal,
      travel_by: this.state.selectedOption.id || '',
    };
    console.log('data', data);
    if (
      this.state.name &&
      this.state.email &&
      this.state.pno &&
      this.state.dest &&
      this.state.budget &&
      this.state.nop &&
      this.state.noc &&
      this.state.nod &&
      this.state.meal &&
      this.state.selectedOption
    ) {
      this.setState({loadingVisible: true});
      Axios({
        url: `${AppConfig.apiPath}enquiry_mail`,
        method: 'POST',
        data: data,
      })
        .then((response) => {
          this.setState({loadingVisible: false});

          Alert.alert('Ampra Travels', response.data.message);
          this.setState({
            selectedOption: null,
            name: '',
            email: '',
            pno: '',
            dest: '',
            nop: 0,
            noc: 0,
            nod: 0,
            meal: '',
            budget: '',
          });
          this.props.navigation.navigate('Explore');
        })
        .catch((err) => {
          this.setState({loadingVisible: false});

          Alert.alert('Ampra Travels', 'Please try again later');
        });
    } else {
      Alert.alert('Ampra Travels', 'All fields are mandetory');
    }
  }

  render() {
    var radiogroup_options = [
      {id: 0, label: 'Flight'},
      {id: 1, label: 'Train'},
    ];
    return (
      <ScrollView style={[{backgroundColor: colors.white}, styles.wrapper]}>
        <KeyboardAvoidingView style={styles.scrollView}>
          <InputField
            labelText="Name"
            onChangeText={(name) => this.setState({name: name})}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            inputType={'email'}
            borderBottomColor={colors.black}
            customStyle={{marginBottom: 30}}
          />
          <InputField
            labelText="Email Address"
            onChangeText={(email) =>
              this.setState({
                email: email,
              })
            }
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="email"
            customStyle={{marginBottom: 30}}
          />
          <InputField
            labelText="Phone Number"
            onChangeText={(pno) => this.setState({pno: pno})}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="phone-pad"
            customStyle={{marginBottom: 30}}
          />
          <InputField
            labelText="Destination"
            onChangeText={(dest) => this.setState({dest: dest})}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="email"
            customStyle={{marginBottom: 30}}
          />
          <InputField
            labelText="Budget"
            onChangeText={(budget) => this.setState({budget: budget})}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="email"
            customStyle={{marginBottom: 30}}
          />
          <InputField
            labelText="Number of PAX"
            onChangeText={(nop) => this.setState({nop: nop})}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="number-pad"
            customStyle={{marginBottom: 30}}
          />
          <InputField
            labelText="Number of Childs"
            onChangeText={(noc) => this.setState({noc: noc})}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="number-pad"
            customStyle={{marginBottom: 30}}
          />
          <InputField
            labelText="Number of Days"
            onChangeText={(nod) => this.setState({nod: nod})}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="number-pad"
            customStyle={{marginBottom: 30}}
          />
          <InputField
            labelText="Meal Plan"
            onChangeText={(meal) => this.setState({meal: meal})}
            labelTextSize={14}
            labelColor={colors.black}
            textColor={colors.black}
            borderBottomColor={colors.black}
            inputType="email"
            customStyle={{marginBottom: 30}}
          />
          <View>
            <Text style={{fontWeight: 'bold'}}>By </Text>
            <View style={{marginTop: 10}}>
              <RadioGroup
                horizontal
                options={radiogroup_options}
                onChange={(option) => this.setState({selectedOption: option})}
                circleStyle={{
                  width: 22,
                  height: 22,
                  borderColor: colors.orange,
                  borderWidth: 1,
                  marginRight: 10,
                  fillColor: colors.orange,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.postData()}
            style={{
              width: '100%',
              paddingVertical: 18,
              backgroundColor: colors.orange,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 16}}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View>
          <Loader
            modalVisible={this.state.loadingVisible}
            animationType="fade"
          />
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
    paddingLeft: 20,
    paddingRight: 20,
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
