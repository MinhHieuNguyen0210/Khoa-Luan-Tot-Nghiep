import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, SafeAreaView,TouchableOpacity, Image, Dimensions, FlatList, ScrollView} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductDetail from "../componets/productDetail/index";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "react-native-elements/dist/list/ListItem";
import { connect } from "react-redux";
const {width, height} = Dimensions.get("window");

const formatCurrency = (monney) => {
    const mn = String(monney);
    return mn
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
            return (index % 3 ? next : next + ".") + prev;
        });
};
const SuccessOff = (props, route) => {
    const navigation = useNavigation();
    const [data, setData] = useState('');
    const [userToken, setUserToken] = useState('')
    useEffect(() => {
        let userToken;
        async function getUserToken() { 
            userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            getApiOrder(userToken);
        }
        getUserToken()
        return () => {}
    }, [])
    // console.log("listorder1", props.route.params.idDetailOrder)
    const getApiOrder = (utoken) => {
        const apiURL = `https://foody-store-server.herokuapp.com/orders/${props.route.params.idDetailOrder}`;
        // console.log("userauth", utoken )
        fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${utoken}`,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(">>responseJson",responseJson)
                setData(responseJson)
            })
            .catch((e) => console.log(e))
    }

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
                        <Text style={{ ...FONTS.h3}}>Success order</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: "center",
                    }}
                ></TouchableOpacity>
            </View>
        );
    };
    const hoantat = () => {
        return(
            <View style={{marginHorizontal: width * 0.05}}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Home')}
                    style={{
                        marginTop:20,
                        height: 40,
                        backgroundColor: "#ffa07a",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                    }}
                >
                    <Text style={{...FONTS.h4,color:COLORS.white}}>Re-Order</Text>
                </TouchableOpacity>
                <Text style={{ ...FONTS.h3,marginTop:20, }}>Completed</Text>
                <ProductDetail
                    fullName = {props.route.params.valueFullName}
                    phoneNumber = {props.route.params.valuePhoneNumber}
                    address = {props.route.params.valueAddress}
                    status={data.status}
                    paymentType={data.paymentType}
                    _id= {data._id}
                />
                <ScrollView>
                    <View style={{marginHorizontal: width * 0.05, marginBottom:10}}> 
                        <Text style={{...FONTS.h3}}>Selected products</Text>
                        <FlatList
                            data={props.cart}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                        />
                    </View>
                    {/* đường line chia cắt */}
                    <View style={{
                        backgroundColor: COLORS.lightGray3,
                        height:5,
                        marginTop:10,
                        marginBottom:10
                    }}>
                    </View>
                    {/* đường line chia cắt */}
                    <View style={{marginHorizontal:width*0.05}}>
                        <Text style={{...FONTS.h3, color:"black "}}>Total</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
                            <Text style={{...FONTS.h4, color:COLORS.darkgray}}>Total</Text>
                            <Text style={{...FONTS.h4, color:COLORS.darkgray}}>{`${formatCurrency(props.totalprice)}`}đ</Text>
                        </View>
                    </View> 
                    {/* đường line chia cắt */}
                    <View style={{
                        backgroundColor: COLORS.lightGray3,
                        height:5,
                        marginTop:10,
                        marginBottom:10
                    }}>
                    </View>
                    {/* đường line chia cắt */}
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:width*0.05}}>
                            <Text style={{...FONTS.h4, color:COLORS.darkgray}}>Payment amount</Text>
                            <Text style={{...FONTS.h4, color:COLORS.darkgray}}>{`${formatCurrency(props.totalprice)}`}đ</Text>
                    </View>
                </ScrollView>
                    
            </View>
        );
    };
     const renderItem = ({item}) => (
            <View 
                style={{
                    marginTop:30,
                    flexDirection: "row",
                    alignItems:'center',
                    justifyContent:'space-between',   
                }}
            >
                <View 
                    style={{
                        flexDirection:"row",
                        // backgroundColor:"red", 
                        width:width*0.3,
                        
                    }}
                >
                    <Text style={{...FONTS.h4, color:"black"}}>{item.quantity}</Text>
                    <Text style={{...FONTS.h4, color:"black", marginLeft:30}}>{item.name}</Text>
                </View>
                    
                <View>
                    <Text style={{...FONTS.h4, color:COLORS.darkgray}}>{`${formatCurrency(item.price)}`}đ</Text>
                </View>
            </View>  
                

    )
    const infomation = () => {
        const renderItem = (infoItem) => {
            // console.log(infoItem)
            return(
                <View>
                    {/* <ProductDetail
                        fullName = {infoItem.item.fullName}
                        phoneNumber = {infoItem.item.phoneNumber}
                        address = {infoItem.item.address}
                        status = {infoItem.item.status}
                        _id = {infoItem.item.id}
                    /> */}
                    <Text>{infoItem.name}</Text>
                    
                </View>
                
            );
        }
        return (
            <View style={{marginHorizontal: width * 0.05, marginBottom:10}}> 
                <FlatList
                    data={data.products}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </View>

        );
    }
    return(
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <ScrollView style={{marginBottom:30}}>
            {hoantat()}
           
            </ScrollView>
            
            {/* {infomation()} */}
           
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
export default connect(mapStatesToProps)(SuccessOff);
