import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    List
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import ProductOrders from "../componets/productOrders/index";
import { ListItem } from "native-base";
import { connect } from "react-redux";
import Moment from "moment";


const { height, width } = Dimensions.get("window");
const OrderHistory = (props) => {
    const navigation = useNavigation();
    const [userToken, setuserToken] = useState("");
    const [data, setData] = useState("");
    // const getInfoOrder = () => {
    //     let userToken ;
    //     async function getUserToken () {
    //         userToken = await AsyncStorage.getItem("userToken")
    //         setuserToken(userToken)
    //         getApiOrder(userToken)
    //     }
    //     getUserToken()

    // }
    const formatIsoStringToDate = (data) => {
        const date = new Date(data);
        const year = date.getFullYear();
        const time = date.toLocaleTimeString(
          ('en', { timeStyle: 'short', hour12: false, timeZone: 'UTC' })
        );
        let month = date.getMonth() + 1;
        let dt = date.getDate();
    
        if (dt < 10) {
          dt = `0${dt}`;
        }
        if (month < 10) {
          month = `0${month}`;
        }
        const object = { year, month, dt, time };
        return object;
      };
    useEffect(() => {
        let userToken;
        async function getUserToken() {
            userToken = await AsyncStorage.getItem("userToken");
            setuserToken(userToken);
            getApiOrder(userToken);
        }
        getUserToken();
        return () => {};
    }, []);

    const getApiOrder = (utoken) => {
        const apiURL = "https://foody-store-server.herokuapp.com/orders/me";
        fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${utoken}`,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(">>respon",responseJson)
                setData(responseJson);
            })
            .catch((e) => console.log(e));
    };
    function renderHeader() {
        return (
            <View style={{ flexDirection: "row", height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            width: "70%",
                            height: "100%",
                            backgroundColor: COLORS.lightGray3,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: SIZES.radius,
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>My orders</Text>
                    </View>
                </View>

                <TouchableOpacity
                    // onPress={() => navigation.navigate('Cart')}
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: "center",
                    }}
                ></TouchableOpacity>
            </View>
        );
    }
    function body(){
        return (
            <View style={{ marginHorizontal: width * 0.08 ,marginTop:25}}>
                <Text style={{ ...FONTS.h3 }}>The order has been completed</Text>
            </View>
        )
        
    }
   
    function renderListOrders() {
            const renderItem = (itemPro) => {
                console.log("itemPro",itemPro.item?.products.name)
                Moment.locale('en');
            return (
                
                <View
                    style={{marginHorizontal: width * 0.05}} 
                >                     
                        <ListItem>                                                       
                                <ProductOrders
                                    onclickOrder={()=>navigation.navigate("OrderDetail",{idDetailOrder:itemPro?.item._id})}
                                    fullName={itemPro?.item?.fullName}
                                    phoneNumber={itemPro?.item?.phoneNumber}
                                    updatedAt={Moment(itemPro?.item?.updatedAt).format('d MMM')}
                                    address={itemPro?.item?.address}
                                    total={itemPro?.item?.totalAmount}
                                    // name = {itemPro?.item.products.name}
                                />  
                                
                                {/* <View style={{marginHorizontal: width * 0.05, marginBottom:10}}> 
                                    <FlatList
                                        data={data.products}
                                        keyExtractor={(item) => item.id}
                                        renderItem={renderItem}
                                    />
                                </View>                          */}
                        </ListItem>                              
                </View>
            );
        };

        
        return (
            <ScrollView>
                <View style={{ }}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                    />
                </View>
            </ScrollView>
        );
    }
    // console.log(">>totalsdasdsadsadas",props.totalprice)
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {body()}
            <View  style={{marginTop:25}}>
                {/* {props.cart.map((item) => renderListOrders(item))} */}
                {renderListOrders()}
            </View>
           
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2,
    },
});

const mapStatesToProps = (state) => {
    return {
        cart: state.cart.cartAr,
        totalprice: state.cart.totalprice,
    };
};
export default connect(mapStatesToProps)(OrderHistory);
// const mapStatesToProps = (state) => {
//     return ({
//         cart:state.cart.cartAr,
//         totalprice: state.cart.totalprice,
//     });
// }
// export default connect(mapStatesToProps)(OrderHistory);
