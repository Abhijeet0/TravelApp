import Axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AppConfig from '../constants/AppConfig';
import { getCookie, getToken, getUser } from '../constants/stoarge';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Loader from './../components/Loader';

export default class History extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            token: null,
            loadingVisible: false
        };
    }

    async getAllBookings(token) {
        this.setState({
            loadingVisible: true
        })
        Axios({
            url: `${AppConfig.apiPath}orders?token=${token}`,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                console.log("histry", res.data)
                this.setState({
                    data: res.data.data,
                    loadingVisible: false
                });
            })
            .catch((err) => {
                this.setState({
                    loadingVisible: false
                })
            });
    }
    async componentDidMount() {
        await getToken().then((state) => {
            this.getAllBookings(state);
            this.setState({
                token: state
            })
        });
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            async () => {
                await getToken().then((state) => {
                    this.getAllBookings(state);
                    this.setState({
                        token: state
                    })
                });
            }
        );
    }

    ItemView(value) {
        return (
            value && value.items.length > 0 ? value.items.map((item, index) => {
                return <TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate("HistoryPkg", { item: item.product })}>
                    <Text style={styles.itemPrice}>
                        {item.name}
                    </Text>
                    <View style={styles.itemFooter}>
                        {/* <Text style={styles.itemText}>
            <Ionicons name="ios-calendar" style={styles.icon} />
            {'  '}
            {item.time}
          </Text> */}
                        <Text style={styles.itemText}>
                            {item.product.formated_price}
                        </Text>

                        {/* <Text style={styles.itemText}>
            <Ionicons name="ios-star" style={styles.icon} /> {'  '}
            {item.rating}
          </Text> */}
                    </View>
                    {/* <Text style={styles.saleoff}>{item.saleoff}%</Text> */}
                </TouchableOpacity>
            }) : null

        )
    };

    render() {
        return (
            <View style={styles.wrapper}>
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
        color: '#000',
        fontSize: 14,
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
