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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
import colors from './../styles/color';
import Entypo from 'react-native-vector-icons/Entypo';
import Loader from './../components/Loader';

const W = Dimensions.get('window').width;

export default class HistoryPackageDetails extends Component {

    render() {
        const { item } = this.props.route.params;
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                    <ImageBackground
                        source={{
                            uri: item.base_image.original_image_url,
                        }}
                        style={styles.itemImage}
                        resizeMode="cover">
                        <View style={styles.itemInner}>
                            <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <View
                                    style={{
                                        width: W - 30,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                    <Text style={styles.itemPrice}>{item.formated_price}</Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
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
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={{ padding: 15 }}>
                        <Text style={styles.itemSD}>Short Description</Text>
                        <HTMLView value={item.short_description} />
                    </View>
                    <View style={{ padding: 15 }}>
                        <Text style={styles.itemSD}>Description</Text>
                        <HTMLView value={item.description} />
                    </View>
                </ScrollView>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    itemSD: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    itemPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 10,
        color: '#fff',
    },
    itemInner: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: W,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
        padding: 12,
        alignItems: 'flex-end',
    },
    itemImage: {
        width: W,
        height: W,
        backgroundColor: 'gray',
    },
    itemTime: {
        color: '#eee',
        fontWeight: '600',
        fontSize: 15,
    },
});
