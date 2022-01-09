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
    Alert,
} from "react-native";
import { Icon, List, ListItem } from "native-base";
import { Avatar, Card, Input, Overlay } from "react-native-elements";
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
    const [couponList, setCouponList] = useState([]);
    const [price, setprice] = useState(props.totalprice);
    const [fakeprice, setfakeprice] = useState(0);
    const [couponcodeID, setcouponcodeID] = useState('');

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
        if (valueAddress && valuePhoneNumber && valueFullName) return true;
        else return false;
    };
    // console.log(">>checkValue",checkValue())
    const handleContinue = () => {
        const paymentTypeApi = "ONLINE";
        setValuePaymentType(paymentTypeApi);
        postApiOrder(props.cart, paymentTypeApi);
        navigation.navigate("Paypal", {
            price:price
        });
    };

    const handleContinueOffline = () => {
        const paymentTypeApi01 = "DIRECT";
        setValuePaymentType(paymentTypeApi01);
        postApiOrder(props.cart, paymentTypeApi01);
        navigation.navigate("SuccessOff", {
            valueAddress: valueAddress,
            valuePhoneNumber: valuePhoneNumber,
            valueFullName: valueFullName,
            price:price
        });
    };

    useEffect(() => {
        getListCode();
        return () => {};
    }, []);

    const postApiOrder = (cart, paymentType1) => {
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
                    paymentType: paymentType1,
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

    const getListCode = () => {
        const apiURL = "https://foody-store-server.herokuapp.com/vouchers";
        fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log("listcode>>", responseJson.name);
                setCouponList(responseJson);
            })
            .catch((error) => console.log(error));
    };

    const addCode = (code) => { 
        console.log("applyForOrderVaule>>",code.applyForOrderVaule);
        console.log("tong tien>>", props.totalprice);
        
        setcouponcodeID(code.id)
        if(props.totalprice >= code.applyForOrderValue){
            console.log("thanh toan dc")
            const priceAfter = props.totalprice - code.promotionAmount;
            console.log("gia cuoi cung>>>", priceAfter);
            return (setprice(priceAfter))
        }
        else{
            console.log("khong thanh toan dc");
            Alert.alert(
                "Alert Title",
                "Vocher khong ap dung duoc cho hoa don nay",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
        }
        
    }
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
                    { height: 25, backgroundColor: COLORS.lightGray2 },
                ]}
            >
                <Text style={{ ...FONTS.h4, fontStyle: "italic" }}>
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
                            height: 180,
                            backgroundColor: COLORS.lightGray2,
                        },
                    ]}
                >
                    <Text style={{ ...FONTS.h4 }}>DELIVERY TO</Text>
                    <TextInput
                        placeholder="Full name"
                        value={valueFullName}
                        onChangeText={(val) => {
                            setValueFullName(val);
                        }}
                        style={{
                            height: 35,
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
                            height: 35,
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
                            height: 35,
                            borderWidth: 0.5,
                            borderRadius: 5,
                            paddingVertical: 7,
                            paddingHorizontal: 10,
                        }}
                    />
                </View>
                {/* mã giảm giá */}
                <View>
                    <Card>
                        <Card.Title
                            style={{
                                width: "100%",
                                textAlign: "left",
                            }}
                        >
                            <View
                                style={{
                                    width: 300,
                                    height: 20,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 17,
                                        color: "grey",
                                        fontStyle: "italic",
                                    }}
                                >
                                    Discount code
                                </Text>
                            </View>
                        </Card.Title>
                        <Card.Divider />
                        <ScrollView
                            style={{ backgroundColor: "white", height: 75 }}
                            horizontal={true}
                        >
                            {couponList.map((coupon) => (
                                <View
                                    style={{
                                        height: 70,
                                        width: 270,

                                        borderRadius: 5,

                                        flexDirection: "row",
                                        marginRight: 15,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: "75%",
                                            backgroundColor: "#e79b4e",
                                            borderBottomRightRadius: 10,
                                            borderTopRightRadius: 10,
                                            paddingLeft: 10,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,

                                            elevation: 5,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: "100%",
                                                backgroundColor: "white",
                                                height: 70,

                                                borderBottomRightRadius: 10,
                                                borderTopRightRadius: 10,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    paddingLeft: 10,
                                                    paddingTop: 5,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: "grey",
                                                        textTransform:
                                                            "uppercase",
                                                    }}
                                                >
                                                    {coupon.name}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontWeight: "bold",
                                                        paddingTop: 3,
                                                    }}
                                                >
                                                    {coupon.description}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: "grey",
                                                        paddingTop: 5,
                                                    }}
                                                >
                                                    {coupon.published_at}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            height: 70,
                                            width: "25%",
                                            backgroundColor: "white",
                                            borderBottomRightRadius: 5,
                                            borderTopRightRadius: 5,
                                            borderBottomLeftRadius: 10,
                                            borderTopLeftRadius: 10,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,

                                            elevation: 5,

                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => addCode(coupon)}
                                        >
                                            <View>
                                                <Text
                                                    style={{
                                                        color: "#ffb460",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    chon
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </Card>
                </View>

                <View
                    style={[
                        styles.rowFront,
                        {
                            justifyContent: "space-evenly",
                            height: 50,
                            marginVertical: 10,
                        },
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
                        <Text style={{ ...FONTS.h4 }}>Total</Text>
                        <Text style={{ ...FONTS.h4 }}>
                            {`${formatCurrency(price)}`}đ
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
                        height: 45,
                        backgroundColor: "#ffe4e1",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    },
                ]}
            >
                {checkValue() ? (
                    <TouchableOpacity
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
                        <Text style={{ color: "white", ...FONTS.h4 }}>
                            Online Payment
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <View
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
                        <Text style={{ color: "white", ...FONTS.h4 }}>
                            Online Payment
                        </Text>
                    </View>
                )}
                {checkValue() ? (
                    <TouchableOpacity
                        onPress={() => handleContinueOffline()}
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
                        <Text style={{ color: "white", ...FONTS.h4 }}>
                            Direct Payment
                        </Text>
                    </TouchableOpacity>
                ) : (
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
                        <Text style={{ color: "white", ...FONTS.h4 }}>
                            Direct Payment
                        </Text>
                    </View>
                )}
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
        // height: 220,
        margin: 3,
        // marginBottom: 10,
        paddingHorizontal: 5,
        // paddingVertical: 5,
        // justifyContent: "space-around",
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 0 },
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
