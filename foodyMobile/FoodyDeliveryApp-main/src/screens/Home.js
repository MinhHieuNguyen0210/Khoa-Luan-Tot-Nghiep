import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    ScrollView,
    Alert,
} from "react-native";
import { Icon } from "native-base";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { imgport } from "../config/port";
import {
    decreaseProduct,
    deleteProduct,
    increaseProduct,
    delallProduct,
    getCart,
    buyProduct,
} from "../../src/componets/productTag/action/index";
import ProductTag from "../componets/productTag/index";

import { AuthContext } from "../componets/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
const Home = (props) => {
    const formatCurrency = (monney) => {
        const mn = String(monney);
        return mn
            .split("")
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ".") + prev;
            });
    };
    // Dummy Datas
    const navigation = useNavigation();
    const initialCurrentLocation = {
        streetName: "Foodiez",
    };
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(
        initialCurrentLocation
    );

    // Hook category
    const [data, setData] = useState([]);
    const [dataImage, setDataImage] = useState([]);
    const [selectCategories, setSelectCategories] = useState(null);
    const [restaurants01, setRrestaurants01] = useState([]);
    const [usertoken, setUsertoken] = useState("");
    const [cartget, setcartGet] = useState("");
    const [cartID, setcartID] = useState("");
    const [totalCart, setTotalCart] = useState("");
    // const productID = props.route.params._id;
    // const dataProduct = { ...props.route.params, id: productID };
    useEffect(() => {
        getListItem();
        let userToken;
        // let {item} = props.route.params;
        async function getTokenOpenCart() {
            userToken = await AsyncStorage.getItem("userToken");
            setUsertoken(userToken);
            //getuserProfile(userToken);
            getCartOpenApp(userToken);
        }
        getTokenOpenCart();

        return () => {};
    }, []);
    
    useEffect(() => {
        async function getListImage(){
            console.log("responseJson.products", responseJson.products)
        }
        getListImage()
    }, [])

    const getListItem = () => {
        
        const apiURL = "https://foody-store-server.herokuapp.com/categories";
        fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {  
                responseJson.map((pro)=>{
                    console.log("product", pro.products)
                })           
                setData(responseJson);
                setRrestaurants01(responseJson[0].products);
                
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //get cart lúc mới vào app
    const getCartOpenApp = (utoken) => {
        const apiURL = "https://foody-store-server.herokuapp.com/carts/me";
        fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${utoken}`,
            },
        })
            .then((response) => response.json())
            .then((responseJsonCart) => {
                // console.log("res1>>", responseJson);
                setcartGet(responseJsonCart);
                if (responseJsonCart._id) {
                    setcartID(responseJsonCart._id);
                }
                let tong;
                tong = responseJsonCart.products.reduce(
                    (total, pro) => total + pro.price,
                    0
                );
                setTotalCart(tong);
            })
            .catch((error) => {
                console.log(error);
            });
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
                ></TouchableOpacity>

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
                        <Text style={{ ...FONTS.h3 }}>
                            {currentLocation.streetName}
                        </Text>
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

    const checkSelectCategories = (values) => {
        // console.log(values);
        let cateProduct = [];
        data.map((id) => {
            if (id.name === values.name) cateProduct = id.products;
        });
        setRrestaurants01(cateProduct);
        setSelectCategories(values);
    };

    function renderCatelogy() {
        const renderItem = ({ item, index }) => {
            // console.log(">>imagecate",item.image)
            return (
                <View>
                    <TouchableOpacity
                        key={item._id}
                        style={{
                            ...styles.shadow,
                            padding: SIZES.padding,
                            paddingBottom: SIZES.padding * 2,
                            borderRadius: SIZES.radius,
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: SIZES.padding,
                            height: 100,
                            backgroundColor:
                                selectCategories?.id === item.id
                                    ? "#F5AA60"
                                    : COLORS.white,
                        }}
                        onPress={() => checkSelectCategories(item)}
                    >
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor:
                                    selectedCategory?.id == item.id
                                        ? COLORS.white
                                        : COLORS.lightGray,
                            }}
                        >
                            <Image
                                source={{
                                    uri: `${imgport}${item.image}.png`,
                                }}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                marginTop: SIZES.padding,
                                color:
                                    selectCategories?.id == item.id
                                        ? COLORS.white
                                        : COLORS.black,
                                ...FONTS.body5,
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        };
        return (
            <View style={{ paddingHorizontal: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h2 }}>Main</Text>
                <Text style={{ ...FONTS.h2 }}>Categories</Text>
                <FlatList
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => {
                        item.id;
                    }}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingVertical: SIZES.padding * 2,
                    }}
                />
            </View>
        );
    }

    function renderListProduct(productlist) {
        const renderItem = ({ item }) => {
            // console.log(">>pro",item?.image)
            return (
                <View key={item.id}>
                    <ProductTag
                        onclickProduct={() => onclickProduct(item)}
                        key={item.id}
                        id={item._id}
                        imagesProductAdd={item.imagesProduct}
                        imagesProduct={item?.image}
                        name={item.name}
                        price={item.price}
                    
                    />
                </View>
            );
        };

        // chuyển qua màn hình product
        const onclickProduct = (prod) =>
            // console.log(prod.name),
            // console.log("prod",prod),
            props.navigation.navigate("Restaurant", prod);

        return (
            <ScrollView 
                // nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ paddingHorizontal: SIZES.padding * 1.5}}>
                    <FlatList
                        data={productlist}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => {
                            item.id;
                        }}
                        renderItem={renderItem}
                        numColumns={2}
                        contentContainerStyle={{
                            paddingVertical: SIZES.padding * 2,
                        }}
                    />
                </View>
            </ScrollView>
        );
    }

    function addToBasket() {
        // console.log(">>dasda", totalCart);
        return (
            <TouchableOpacity
                style={{
                    height: 50,
                    width: width * 1,
                    backgroundColor: "#d2691e",
                    marginBottom: height * 0.09,
                    paddingHorizontal: width * 0.07,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                onPress={() => navigation.navigate("Cart")}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon
                        name="shoppingcart"
                        type="AntDesign"
                        style={{
                            width: 25,
                            height: 25,
                            color: COLORS.lightGray3 ,
                            marginRight: 10,
                        }}
                    />
                    <Text style={{ ...FONTS.body2, color: COLORS.lightGray3 }}>
                        Add To Basket
                    </Text>
                </View>

                {/* {props.totalprice>0? */}
                {/* <View> */}
                    <Text style={{ ...FONTS.body2, color: COLORS.lightGray3  }}>
                        {`${formatCurrency(props.totalprice)}`}đ
                        {/* {totalCart} */}
                    </Text>
                {/* </View>:
                <Text style={{ ...FONTS.body2, color: "#696969" }}>
                    Loading.......
                </Text>
                } */}
            </TouchableOpacity>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderCatelogy()}
            {renderListProduct(restaurants01)}
            {addToBasket()}
            {/* {props.cart.map((prod) => addToBasket(prod))} */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.lightGray4,
        backgroundColor: "#ffe4e1",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
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
        getCart: (product_current) => dispatch(getCart(product_current)),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
