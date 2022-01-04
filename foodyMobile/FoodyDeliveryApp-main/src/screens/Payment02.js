import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    NativeModules,
} from "react-native";
import { Icon, ListItem } from "native-base";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
const { width, height } = Dimensions.get("window");

const Payment02 = ({ navigation }) => {
    const [visapay, setVisapay] = useState(false);
    const [codpay, setCodpay] = useState(false);

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
    function renderStepPayHeader() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    paddingVertical: width * 0.05,
                    marginHorizontal: width * 0.15,
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <View
                        style={{
                            borderWidth: 5,
                            borderRadius: 20,
                            width: width * 0.1,
                            alignItems: "center",
                            backgroundColor: "#0CC210",
                        }}
                    >
                        <Text style={{ ...FONTS.h2, color: "black" }}>1</Text>
                    </View>
                    {/* <Text style={{...FONTS.h3}}>Delivery</Text> */}
                </View>
                <View
                    style={{
                        width: 80,
                        marginTop: 20,
                        backgroundColor: "black",
                        height: 3,
                    }}
                ></View>
                <View style={{ alignItems: "center" }}>
                    <View
                        style={{
                            borderWidth: 5,
                            borderRadius: 20,
                            width: width * 0.1,
                            alignItems: "center",
                            backgroundColor: "#0CC210",
                        }}
                    >
                        <Text style={{ ...FONTS.h2, color: "black" }}>2</Text>
                    </View>
                    {/* <Text style={{...FONTS.h3}}>Payment</Text> */}
                </View>
                <View
                    style={{
                        width: 80,
                        marginTop: 20,
                        backgroundColor: "black",
                        height: 3,
                    }}
                ></View>
                <View style={{ alignItems: "center" }}>
                    <View
                        style={{
                            borderWidth: 5,
                            borderRadius: 20,
                            width: width * 0.1,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ ...FONTS.h2, color: "black" }}>3</Text>
                    </View>
                    {/* <Text style={{...FONTS.h3}}>Done </Text> */}
                </View>
            </View>
        );
    }
    function renderBody() {
        return (
            <ScrollView style={{ paddingHorizontal: width * 0.05 }}>
                {/* Delivery time */}
                <View style={styles.rowFront}>
                    <Text style={{ ...FONTS.h3 }}>DELIVERY TO</Text>
                    <View
                        style={{ justifyContent: "space-around", height: 100 }}
                    >
                        <Text style={{ ...FONTS.h4 }}>HUYHUYNH</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ ...FONTS.h4 }}>Phone number : </Text>
                            <Text>0961003973</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ ...FONTS.h4 }}>Address: </Text>
                            <Text>37B duong so 8, P.truong tho</Text>
                        </View>
                    </View>
                </View>
                {/* hinh thuc thanh toan */}
                <View style={[styles.rowFront, { height: 200 }]}>
                    <Text style={{ ...FONTS.h3 }}>PAYMENTS</Text>
                    {visapay ? (
                        <TouchableOpacity
                            style={[
                                styles.btnPayment,
                                {backgroundColor: COLORS.darkgray,}
                            ]}
                        >
                            <Text style={{ ...FONTS.h4, color: "#fff" }}>
                                Payment by card (ATM/VISA)
                            </Text>
                            <Icon name="cc-visa" type="FontAwesome" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                setVisapay(true);
                                setCodpay(false);
                            }}
                            style={[
                                styles.btnPayment,
                                {backgroundColor: COLORS.lightGray2,}
                            ]}
                        >
                            <Text style={{ ...FONTS.h4, color: "black" }}>
                                Payment by card (ATM/VISA)
                            </Text>
                            <Icon name="cc-visa" type="FontAwesome" />
                        </TouchableOpacity>
                    )}

                    {codpay ? (
                        <TouchableOpacity
                            style={[
                                styles.btnPayment,
                                {backgroundColor: COLORS.darkgray,}
                            ]}
                        >
                            <Text style={{ ...FONTS.h4, color: "#fff" }}>
                                Payment on delivery
                            </Text>
                            <Icon name="dollar-bill" type="Foundation" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                setCodpay(true);
                                setVisapay(false);
                            }}
                            style={[
                                styles.btnPayment,
                                {backgroundColor: COLORS.lightGray2,}
                            ]}
                        >
                            <Text style={{ ...FONTS.h4, color: "black" }}>
                                Payment on delivery
                            </Text>
                            <Icon name="dollar-bill" type="Foundation" />
                        </TouchableOpacity>
                    )}
                </View>
                {/* order summary */}
                <View>
                    <Text style={{ ...FONTS.h2 }}>ORDER SUMMARY</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 1,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1,
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>0 Items in Cart</Text>
                        <Text style={{ ...FONTS.h3 }}>$0.00</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            // paddingVertical: SIZES.padding * 0.5,
                            paddingHorizontal: SIZES.padding * 1,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1,
                        }}
                    >
                        <Text
                            style={{ ...FONTS.body3, color: COLORS.darkgray }}
                        >
                            Total order
                        </Text>
                        <Text style={{ ...FONTS.h3 }}>$0.00</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            // paddingVertical: SIZES.padding * 0.5,
                            paddingHorizontal: SIZES.padding * 1,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1,
                        }}
                    >
                        <Text
                            style={{ ...FONTS.body3, color: COLORS.darkgray }}
                        >
                            {" "}
                            Cost ship
                        </Text>
                        <Text style={{ ...FONTS.h3 }}>$0.00</Text>
                    </View>
                    <View
                        style={{
                            width: width * 10,
                            marginTop: 20,
                            backgroundColor: "black",
                            height: 3,
                        }}
                    ></View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 1,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1,
                        }}
                    >
                        <Text style={{ ...FONTS.h1 }}>Total</Text>
                        <Text style={{ ...FONTS.h1 }}>$0.00</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
    function renderFooter() {
        return (
            <View style={[styles.rowFront, { height: 100 }]}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        paddingBottom: SIZES.padding * 1,
                        paddingHorizontal: SIZES.padding * 1,
                        borderBottomColor: COLORS.lightGray2,
                    }}
                >
                    <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
                        Total:{" "}
                    </Text>
                    <Text style={{ ...FONTS.h3 }}>$0.00</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Payment03")}
                    style={{
                        marginHorizontal: width * 0.15,
                        height: 40,
                        backgroundColor: "#0CC255",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderRadius: 20,
                    }}
                >
                    <Text style={{ color: "white", ...FONTS.h4 }}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderStepPayHeader()}
            {renderBody()}
            {renderFooter()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2,
    },
    rowFront: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        height: 220,
        margin: 3,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: "space-around",
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    btnPayment: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        borderWidth: 0.5,
        borderRadius: 5,
        paddingVertical: 7,
        paddingHorizontal: 10,
    },
});

export default Payment02;
