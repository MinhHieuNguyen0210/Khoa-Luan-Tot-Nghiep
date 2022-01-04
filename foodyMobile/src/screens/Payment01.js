import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Image,
    NativeModules,
    TextInput,
    ScrollView,
} from "react-native";
import { Icon, List, ListItem } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

import ProductCheckout from "../componets/productCheckout/index";
const { width, height } = Dimensions.get("window");
const Payment01 = (props) => {
    const [valueAddress, setValueAddress] = useState("");
    const [valuePhoneNumber, setValuePhoneNumber] = useState("");
    const [valueFullName, setValueFullName] = useState("");
    const [valuePaymentType, setValuePaymentType] = useState("");

    const navigation = useNavigation();
    const formatCurrency = (monney) => {
        const mn = String(monney);
        return mn
            .split("")
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ".") + prev;
            });
    };
    const checkValue = () => {
        if (valueAddress && valuePhoneNumber && valueFullName)
            return true ;
        else 
            return false ;
    }
    // console.log(">>checkValue",checkValue())
    const handleContinue = () => {
        const paymentTypeApi = "ONLINE";
        setValuePaymentType(paymentTypeApi);
        postApiOrder(props.cart, paymentTypeApi);
        navigation.navigate("Paypal");
    };
 
    const handleContinueOffline = () => {
        const paymentTypeApi01 = "DIRECT";
        setValuePaymentType(paymentTypeApi01);
        postApiOrder(props.cart, paymentTypeApi01);
        navigation.navigate("SuccessOff",  {
            valueAddress: valueAddress,
            valuePhoneNumber: valuePhoneNumber,
            valueFullName: valueFullName,
        });
    };
    // console.log(">>paymentType1",valuePaymentType)

    const postApiOrder = (
        cart,
        paymentType1
    ) => {
        
        let userToken;
        let prolistorder = props.cart;
        // console.log(">>cart", props.cart);

        prolistorder.map((pro) => {
            delete pro.id;
        });
        
        userToken = AsyncStorage.getItem("userToken").then((res) => {
            const apiURL = "https://foody-store-server.herokuapp.com/orders";
            fetch(apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: `Bearer ${res}`,
                },
                body: JSON.stringify({
                    address: valueAddress,
                    fullName: valueFullName,
                    phoneNumber: valuePhoneNumber,
                    products: prolistorder,
                    totalAmount: props.totalprice,
                    status: "PENDING",
                    paymentType:paymentType1
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log(responseJson);
                })
                .catch((e) => {
                    console.log(e);
                });
        });
    };

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    height: 60,
                    borderBottomWidth: 0.3,
                    paddingBottom: 10,
                }}
            >
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
                        <Text style={{ ...FONTS.h3 }}>Payment</Text>
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
    }

    function renderTypePro() {
        return (
            <View
                style={[
                    styles.rowFront,
                    { height: 50, backgroundColor: COLORS.lightGray2 },
                ]}
            >
                <Text style={{ ...FONTS.h3, fontStyle: "italic" }}>
                    Types of products : {props.cart.length}{" "}
                </Text>
            </View>
        );
    }
    function renderProductCheck(item, index) {
        return (
            // style={styles.rowFront}
            <ScrollView
                nestedScrollEnabled={true}
                key={item.id}
                style={([styles.rowFront], { height: 100 })}
            >
                <ProductCheckout
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    imagesProductAdd={item.imagesProduct}
                    imagesProduct={item.image}
                />
            </ScrollView>
        );
    }
    function renderBody() {
        return (
            <View style={{ paddingHorizontal: width * 0.05 }}>
                {/* Delivery to */}
                <View
                    style={[
                        styles.rowFront,
                        {
                            justifyContent: "space-evenly",
                            height: 250,
                            backgroundColor: COLORS.lightGray2,
                        },
                    ]}
                >
                    <Text style={{ ...FONTS.h3 }}>DELIVERY TO</Text>
                    <TextInput
                        placeholder="Full name"
                        value={valueFullName}
                        onChangeText={(val) => {
                            setValueFullName(val);
                        }}
                        style={{
                            borderWidth: 0.5,
                            borderRadius: 5,
                            paddingVertical: 7,
                            paddingHorizontal: 10,
                        }}
                    />
                    <TextInput
                        placeholder="Phone number"
                        value={valuePhoneNumber}
                        onChangeText={(val) => {
                            setValuePhoneNumber(val);
                        }}
                        keyboardType={"phone-pad"}
                        style={{
                            borderWidth: 0.5,
                            borderRadius: 5,
                            paddingVertical: 7,
                            paddingHorizontal: 10,
                        }}
                    />
                    <TextInput
                        placeholder="Address..."
                        value={valueAddress}
                        onChangeText={(val) => {
                            setValueAddress(val);
                        }}
                        style={{
                            borderWidth: 0.5,
                            borderRadius: 5,
                            paddingVertical: 7,
                            paddingHorizontal: 10,
                        }}
                    />
                </View>
                <View
                    style={[
                        styles.rowFront,
                        { justifyContent: "space-evenly", height: 75 },
                    ]}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: SIZES.padding * 1,
                            paddingHorizontal: SIZES.padding * 1,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1,
                            backgroundColor: COLORS.lightGray2,
                        }}
                    >
                        <Text style={{ ...FONTS.h2 }}>Total</Text>
                        <Text style={{ ...FONTS.h2 }}>
                            {`${formatCurrency(props.totalprice)}`}đ
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    function renderFooter() {
        return (
            <View
                style={[
                    styles.rowFront,
                    {
                        height: 60,
                        backgroundColor: "#ffe4e1",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    },
                ]}
            >
                {checkValue()?<TouchableOpacity
                    onPress={() => handleContinue()}
                    style={{
                        // marginHorizontal: width * 0.15,
                        width: 150,
                        height: 40,
                        backgroundColor: COLORS.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderRadius: 20,
                    }}
                >
                    <Text style={{ color: "white", ...FONTS.h4 }}>Online Payment</Text>
                </TouchableOpacity>:<View
                    
                    style={{
                        // marginHorizontal: width * 0.15,
                        width: 150,
                        height: 40,
                        backgroundColor: "#c0c0c0",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderRadius: 20,
                    }}
                >
                    <Text style={{ color: "white", ...FONTS.h4 }}>Online Payment</Text>
                </View>}
                {checkValue()?<TouchableOpacity
                    onPress={() =>handleContinueOffline()}
                    style={{
                        // marginHorizontal: width * 0.15,
                        width: 150,
                        height: 40,
                        backgroundColor: COLORS.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderRadius: 20,
                    }}
                >
                    <Text style={{ color: "white", ...FONTS.h4 }}>Direct Payment</Text>
                </TouchableOpacity>:
                <View
                // onPress={() =>handleContinueOffline()}
                style={{
                    // marginHorizontal: width * 0.15,
                    width: 150,
                    height: 40,
                    backgroundColor: "#c0c0c0",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderRadius: 20,
                }}
                >
                <Text style={{ color: "white", ...FONTS.h4 }}>Direct Payment</Text>
                </View>}
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {/* {renderStepPayHeader()} */}
            {renderTypePro()}
            <ScrollView nestedScrollEnabled={true}>
                {props.cart.map((item) => renderProductCheck(item))}
            </ScrollView>

            {renderBody()}
            {renderFooter()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.lightGray2,
        backgroundColor: "#ffe4e1",
    },
    rowFront: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        height: 220,
        margin: 3,
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        // justifyContent: "space-around",
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    style_button: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: SIZES.padding * 2,
        paddingVertical: SIZES.padding * 2,
        borderWidth: 1,
    },
});

const mapStatesToProps = (state) => {
    return {
        cart: state.cart.cartAr,
        totalprice: state.cart.totalprice,
    };
};
export default connect(mapStatesToProps)(Payment01);
