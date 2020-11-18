import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView, Image, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import AppConfig from '../constants/AppConfig';

const W = Dimensions.get('window').width;

export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            searchText: "",
            searchData: [],
            found: true
        }
    }
    GetSearch() {
        Axios({
            url: `${AppConfig.apiPath}products?name=${this.state.searchText}`,
            method: 'GET',
        })
            .then(async (response) => {
                if (response.data.data.length > 0) {
                    this.setState({
                        searchData: response.data.data,
                        found: true
                    })
                } else {
                    this.setState({
                        found: false,
                        searchData: []
                    })
                }

            })
            .catch((err) => {
                console.log('err', err);
            });
    }
    onChangeText = (text) => {
        this.setState({
            searchText: text
        })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        backgroundColor: "#FFFFFF",
                        paddingLeft: 10,
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack(null);
                        }}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={25}
                            color="#000000"
                        />
                    </TouchableOpacity>
                    <View style={styles.searchBarContainer}>
                        <View style={styles.searchIcon}>
                            <Ionicons name="search-outline" color="#808080" size={18} />
                        </View>
                        <TextInput
                            onSubmitEditing={() => {
                                this.GetSearch();
                            }}
                            autoFocus
                            onChangeText={this.onChangeText}
                            value={this.state.searchText}
                            placeholderTextColor="#808080"
                            placeholder="Search Here..."
                            style={styles.searchBar}
                        />
                    </View>
                </View>
                <ScrollView style={{ padding: 15 }}>
                    {
                        !this.state.found && <Text style={{ alignSelf: "center", textAlign: 'center' }}>Search result not found...</Text>
                    }
                    {this.state.searchData && this.state.searchData.length > 0 &&
                        this.state.searchData.map((item, index) => {
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
                                                    <Ionicons
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
                            )
                        })
                    }
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
    },

    searchBarContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        // height: 30,
        backgroundColor: "#e4f0fb",
        borderRadius: 50,
        // padding: 8,
        marginLeft: 4,
        width: "80%",
        borderColor: "#e4f0fb",
        borderWidth: 1,
        margin: 10,
    },

    searchIcon: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
        alignSelf: "center",
    },

    searchBar: {
        // flex: 1,
        color: "#000000",
        // backgroundColor: '#808080',
        fontSize: 14,
        height: 40,
        marginLeft: 5,
        alignItems: "center",
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