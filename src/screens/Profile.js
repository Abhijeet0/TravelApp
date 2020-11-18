import React, { Component } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getDP, getToken, getUser } from '../constants/stoarge';
import color from '../styles/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Axios from 'axios';
import AppConfig from '../constants/AppConfig';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            data: null,
            token: null,
            loadingVisible: false,
            dp: null
        }
    }

    clearAsyncStorage = async () => {
        await AsyncStorage.clear();
    }

    postlogout() {
        this.setState({
            loadingVisible: true
        })
        Axios({
            url: `${AppConfig.apiPath}customer/logout?token=${this.state.token}`,
            method: 'GET',
        })
            .then((response) => {
                console.log('reslog', response.data);
                this.clearAsyncStorage();
                this.setState({
                    loadingVisible: false
                })
                this.props.navigation.navigate("Login")
            })
            .catch((err) => {
                console.log('errlog', err);
                this.setState({
                    loadingVisible: false
                })
            });
    }

    async componentDidMount() {
        await getToken().then(state => {
            this.setState({
                token: state
            })
        })
        await getUser().then(state => {
            this.setState({
                data: state.data
            })
        })
        await getDP().then(state => {
            this.setState({
                dp: state
            })
        })
    }
    render() {
        const { dp } = this.state;
        if (!this.state.data) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="small" color={color.black} />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Image
                    source={
                        dp
                            ? { uri: "data:image/png;base64," + dp }

                            : require("./../assets/user.png")
                    }
                    style={{ width: 120, height: 120, borderRadius: 150 / 2, justifyContent: "center", alignSelf: "center", marginTop: 15 }}
                />
                <Text style={styles.field}>{"Name : " + this.state.data.name}</Text>
                <View style={styles.divider} />
                <Text style={styles.field}>{"Email : " + this.state.data.email}</Text>
                <View style={styles.divider} />
                {
                    this.state.data.date_of_birth ? <>
                        <Text style={styles.field}>{"Date of Birth : " + this.state.data.date_of_birth}</Text>
                        <View style={styles.divider} />
                    </> : null
                }

                {
                    this.state.data.gender ? <>
                        <Text style={styles.field}>{"Gender : " + this.state.data.gender}</Text>
                        <View style={styles.divider} />
                    </> : null
                }

                {
                    this.state.data.phone ? <>
                        <Text style={styles.field}>{"Phone Number : " + this.state.data.phone}</Text>
                        <View style={styles.divider} />
                    </> : null
                }


                <TouchableOpacity onPress={() => Alert.alert("Ampra Travels", "Do you want to logout?", [
                    {
                        text: "Ok",
                        onPress: () => this.postlogout()
                    },
                    {
                        text: "Cancel"
                    }
                ])} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                    <AntDesign name="logout" size={20} color={color.black} />
                    <Text style={styles.field}>Logout</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <View>
                    <Loader modalVisible={this.state.loadingVisible} animationType="fade" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    field: {
        fontSize: 16,
        fontWeight: "bold",
        margin: 15
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: color.lightGray
    }
})
