import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    ScrollView,
    Modal,
    Button,
    Alert,
} from "react-native";
import { SearchBar, Input, Avatar, Rating } from "react-native-elements";
import { icons, COLORS, SIZES, FONTS } from "../constants";
import { Icon } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CommentTag from "../componets/commentTag/index";
import { connect } from "react-redux";
import { buyProduct } from "../componets/productTag/action";
import { imgport } from "../config/port";

const { width, height } = Dimensions.get("window");
const Restaurant = (props) => {
    const [data, setData] = useState([]);
    const [restaurants01, setRestaurants01] = React.useState(null);
    const [comlist, setcomlist] = useState([]);
    const [isloadcm, setisloadcm] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [datapost, setdatapost] = useState({rating: 4});
    const productID = props.route.params._id;
    const dataProduct = { ...props.route.params, id: productID };

    const formatCurrency = (monney) => {
        const mn = String(monney);
        return mn
            .split("")
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ".") + prev;
            });
    };
    // const {name, price, imagesProduct} = props.route.params
    React.useEffect(() => {
        let { item, currentLocation } = props.route.params;
        // console.log(">>`route.params`",`${props.route.params.image.url}`)
        // console.log(">>naem" ,`${props.route.params.name}`)
        setRestaurants01(item);
        // setCurrentLocation(currentLocation)
    });

    

    // lấy ra usernaem
    const getGmail = (utoken) => {
        const apiURL = "https://foody-store-server.herokuapp.com/users/me";
        fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${utoken}`,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setdatapost({
                    ...datapost,
                    username: responseJson.username,
                    productID: productID,
                });
            })
            .catch((error) => console.log(error));
    };

    // post bình luận
    const onComment = () => {
        // console.log(" console.log('>>datapst', datapost);"datapost.comment);
        const apiURL = "https://foody-store-server.herokuapp.com/feedbacks";
        if (datapost.comment !== undefined) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datapost),
            };
            fetch(apiURL, requestOptions)
                .then((response) => response.json())
                .then((datare) => {
                    console.log("chay vao day")
                    console.log(">>datare", datare);
                    getComment();
                    setModalVisible(!modalVisible);
                })
                .catch((error) => console.log(error));
        }
    };

    //get bình luận
    const getComment = () => {
        const apiURL = `https://foody-store-server.herokuapp.com/feedbacks?productID=${productID}`;
        // let cmarr = [];
        setisloadcm(true);       
        fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {
                // cmarr = [...responseJson.comment];
                // const cmmbpro = cmarr.filter(
                //     (cm) => cm.productId === productID
                // );
                // console.log('>>cmmbpro', cmmbpro);
                setcomlist(responseJson);
                setisloadcm(false);
                console.log("commets", responseJson);
            })
            .catch((e) => console.log(e));
    };
    useEffect(() => {
        let userToken;
        getListProduct();
        async function getusertoken() {
            userToken = await AsyncStorage.getItem("userToken");
            getGmail(userToken);
        }
        getusertoken();
        // onComment();
        getComment();
        return () => {};
    }, []);
    const getListProduct = () => {
        const apiURL = "https://foody-store-server.herokuapp.com/categories";
        fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
                // console.log(responseJson);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // header
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    height: 45,
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: "center",
                    }}
                    onPress={() => props.navigation.goBack()}
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

                {/* Restaurant Name Section */}
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* <View
                        style={{
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3,
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Product Details</Text>
                    </View> */}
                </View>

                <View
                    style={{
                        width: 120,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <Icon
                        name="shoppingcart"
                        type="AntDesign"
                        style={{
                            width: 25,
                            height: 25,
                            // color: COLORS.lightGray3 ,
                            marginRight: 10,
                        }}
                    />
                    <Text style={{ fontSize: 20 }}>
                        {formatCurrency(props.totalprice)}đ
                    </Text>
                </View>
            </View>
        );
    }

    // body
    function renderFoodInfo01() {
        return (
            <View style={{ alignItems: "center" }}>
                <View style={{ height: SIZES.height * 0.35 }}>
                    {/* food image */}
                    <Image
                        source={{
                            uri: `${imgport}${props.route.params.image}.png`,
                        }}
                        resizeMode="cover"
                        style={{
                            width: SIZES.width,
                            height: "100%",
                        }}
                    />
                    {/* Quantity */}
                    <View
                        style={{
                            position: "absolute",
                            bottom: -20,
                            width: SIZES.width,
                            height: 50,
                            justifyContent: "center",
                            flexDirection: "row",
                        }}
                    ></View>
                </View>
                {/* Name & Description */}
                <View
                    style={{
                        width: SIZES.width,
                        alignItems: "center",
                        // marginTop: 5,
                        paddingHorizontal: SIZES.padding * 2,
                    }}
                >
                    <Text
                        style={{
                            marginVertical: 10,
                            textAlign: "center",
                            ...FONTS.h2,
                        }}
                    >
                        {props.route.params.name} -{" "}
                        {formatCurrency(props.route.params.price)}đ
                    </Text>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            marginTop: 2,
                            borderRadius: 20,
                            width: width * 0.9,
                            height: height * 0.13,
                            borderWidth: 1,
                            backgroundColor: COLORS.lightGray3,
                            paddingHorizontal: width * 0.02,
                            paddingVertical: height * 0.01,
                        }}
                    >
                        <Text style={{ ...FONTS.h4, color: COLORS.darkgray }}>
                            {`Description: ${props.route.params.description}`}
                        </Text>
                    </ScrollView>
                </View>
                {/* binh luan */}
            </View>
        );
    }

    function feedbackUser() {
        return (
            <View
                style={{
                    marginTop: 10,
                    marginHorizontal: width * 0.05,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ color: "grey", fontSize: 17 }}>
                        {"Đánh giá"}
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Icon
                            style={{
                                color: "white",
                                fontSize: 20,
                                color: "grey",
                            }}
                            name="commenting"
                            type="FontAwesome"
                            solid
                        />
                    </TouchableOpacity>
                </View>
                <View
                // style={{paddingTop: 10, height: 200}}
                >
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: 190,
                                top: 500,
                                // top:320,
                                backgroundColor: "white",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: "90%",
                                    height: "90%",
                                    borderRadius: 20,
                                }}
                            >
                                <View style={{ right: 0 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                color: "white",
                                                fontSize: 20,
                                                color: "grey",
                                            }}
                                            name="close"
                                            type="Ionicons"
                                            solid
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Rating
                                    type="heart"
                                    showRating={false}
                                    onFinishRating={(rating) =>
                                        setdatapost({
                                            ...datapost,
                                            rating: rating,
                                        })
                                    }
                                    style={{ paddingVertical: 10 }}
                                    imageSize={30}
                                    defaultRating={5}
                                />
                                <Input
                                    placeholder="Bình luận"
                                    leftIcon={{
                                        type: "font-awesome",
                                        name: "comments",
                                    }}
                                    onChangeText={(value) =>
                                        setdatapost({
                                            ...datapost,
                                            comment: value,
                                        })
                                    }
                                />
                                <View
                                    style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{ width: "80%", paddingTop: 10 }}
                                    >
                                        <Button
                                            onPress={() => onComment()}
                                            color="#ffb460"
                                            title="Evaluate"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View
                    style={{
                        // marginHorizontal: width * 0.05,
                        height: 200,
                        marginTop: 8,
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {comlist.length === 0 ? (
                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 100,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        opacity: 0.4,
                                    }}
                                >
                                    There are no reviews yet
                                </Text>
                            </View>
                        ) : (
                            <ScrollView>
                                {comlist.map((cm) => (
                                    <CommentTag
                                        key={cm._id}
                                        accname={cm.username}
                                        comment={cm.comment}
                                        rates={cm.rating}
                                    />
                                ))}
                            </ScrollView>
                        )}
                    </ScrollView>
                </View>
            </View>
        );
    }
    //footer
    function renderOrder() {
        return (
            <View
            // style={{
            //     backgroundColor: COLORS.white,
            //     borderTopLeftRadius: 40,
            //     borderTopRightRadius: 40,

            // }}
            >
                {/* Order Button */}
                <View
                    style={{
                        marginTop: 5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: SIZES.width * 0.9,
                            padding: SIZES.padding,
                            backgroundColor: COLORS.primary,
                            alignItems: "center",
                            borderRadius: SIZES.radius,
                        }}
                        onPress={() => props.buyProduct(dataProduct)}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                            Add To Cart
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderFoodInfo01(restaurants01)}
            {feedbackUser()}
            {renderOrder()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1",
    },
});

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cartAr,
        totalprice: state.cart.totalprice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        buyProduct: (product_current) => dispatch(buyProduct(product_current)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
