import React, { Component } from 'react';
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
import { getToken, getUser } from '../constants/stoarge';

const { width, height } = Dimensions.get('window');

export default class AddAddress extends Component {
    constructor() {
        super();
        this.state = {
            address1: '',
            city: '',
            country_name: '',
            phone: '',
            postCode: '',
            state: '',
            loadingVisible: false,
            token: null,
            user: null
        };
    }

    async componentDidMount() {
        await getUser().then(state => {
            this.setState({
                user: state.data
            })
        })
        await getToken().then(state => {
            this.setState({
                token: state
            })
        })
    }

    postData() {
        let data = {
            "first_name": this.state.user.first_name,
            "last_name": this.state.user.last_name,
            "address1": [
                this.state.address1
            ],
            "city": this.state.city,
            "country": "IN",
            "country_name": this.state.country_name,
            "phone": this.state.phone,
            "postcode": this.state.postCode,
            "state": this.state.state

        };
        if (
            this.state.address1 &&
            this.state.city &&
            this.state.country_name &&
            this.state.phone &&
            this.state.postCode &&
            this.state.state) {
            this.setState({ loadingVisible: true });
            Axios({
                url: `${AppConfig.apiPath}addresses/create?token=${this.state.token}`,
                method: 'POST',
                data: data,
            })
                .then((response) => {
                    this.setState({ loadingVisible: false });

                    Alert.alert('Ampra Travels', response.data.message);
                    this.setState({
                        address1: '',
                        city: '',
                        country_name: '',
                        phone: '',
                        postCode: 0,
                        state: 0,
                    });
                    this.props.navigation.navigate('Address');
                })
                .catch((err) => {
                    this.setState({ loadingVisible: false });

                    Alert.alert('Ampra Travels', 'Please try again later');
                });
        } else {
            Alert.alert('Ampra Travels', 'All fields are mandetory');
        }
    }

    render() {
        return (
            <ScrollView style={[{ backgroundColor: colors.white }, styles.wrapper]}>
                <KeyboardAvoidingView style={styles.scrollView}>
                    <InputField
                        labelText="Address"
                        onChangeText={(name) => this.setState({ address1: name })}
                        labelTextSize={14}
                        labelColor={colors.black}
                        textColor={colors.black}
                        inputType={'email'}
                        borderBottomColor={colors.black}
                        customStyle={{ marginBottom: 30 }}
                    />
                    <InputField
                        labelText="City"
                        onChangeText={(email) =>
                            this.setState({
                                city: email,
                            })
                        }
                        labelTextSize={14}
                        labelColor={colors.black}
                        textColor={colors.black}
                        borderBottomColor={colors.black}
                        inputType="email"
                        customStyle={{ marginBottom: 30 }}
                    />
                    <InputField
                        labelText="State"
                        onChangeText={(nop) => this.setState({ state: nop })}
                        labelTextSize={14}
                        labelColor={colors.black}
                        textColor={colors.black}
                        borderBottomColor={colors.black}
                        inputType="email"
                        customStyle={{ marginBottom: 30 }}
                    />
                    <InputField
                        labelText="Country"
                        onChangeText={(pno) => this.setState({ country_name: pno })}
                        labelTextSize={14}
                        labelColor={colors.black}
                        textColor={colors.black}
                        borderBottomColor={colors.black}
                        inputType="email"
                        customStyle={{ marginBottom: 30 }}
                    />
                    <InputField
                        labelText="Phone"
                        onChangeText={(dest) => this.setState({ phone: dest })}
                        labelTextSize={14}
                        labelColor={colors.black}
                        textColor={colors.black}
                        borderBottomColor={colors.black}
                        inputType="phone-pad"
                        customStyle={{ marginBottom: 30 }}
                    />
                    <InputField
                        labelText="PostCode"
                        onChangeText={(budget) => this.setState({ postCode: budget })}
                        labelTextSize={14}
                        labelColor={colors.black}
                        textColor={colors.black}
                        borderBottomColor={colors.black}
                        inputType="number-pad"
                        customStyle={{ marginBottom: 30 }}
                    />

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
                        <Text style={{ color: '#fff', fontSize: 16 }}>Submit</Text>
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
