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
    ScrollView,
    Alert, 
} from "react-native";
import { Button, Icon, ListItem, Tab } from "native-base";
import tabs from "../navigation/tabs";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import Tabs from "../navigation/tabs";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import {
    deleteProduct,
    increaseProduct,
    decreaseProduct,
    updateProduct,
    delallProduct,
    getCart,
} from "../componets/productTag/action/index";
import ProductCart from "../componets/productCart/index";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
const Cart = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [usertoken, setUsertoken] = useState("");
    const [update, setUpdate] = useState("");
    const [cartget, setcartGet] = useState("");
    const [cartID, setcartID] = useState("");
    let userToken1 = '';
    const formatCurrency = (monney) => {
        const mn = String(monney);
        return mn
            .split("")
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ".") + prev;
            });
    };
    useEffect(() => {
        // apiCarts()
        let userToken;
        async function getuserToken() {
            userToken = await AsyncStorage.getItem("userToken");
            setUsertoken(userToken);
            apiCarts(userToken);
        }
        getuserToken();
       
        return () => {};
    }, []);
  
    
    // lưu giỏ hàng dưới api 
    useEffect(async() => {
        // console.log("chay vao")
        userToken1 = await AsyncStorage.getItem("userToken");
        apiUpdateCarts(userToken1,props.cart,cartID)     
    }, [props.totalprice]);

    const apiCarts = (utoken) => {
        const apiURL = "https://foody-store-server.herokuapp.com/carts/me";
        fetch(apiURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${utoken}`,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log("res>>", responseJson)
                setcartGet(responseJson)
                if(responseJson._id){
                    setcartID(responseJson._id);
                }
                return dispatch(getCart(responseJson));
               
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const apiPostCarts = (utoken, productlist) => {
        const apiURL = "https://foody-store-server.herokuapp.com/carts";
        let productlistpost = productlist;
        productlistpost.map((pro)=>pro.productID = pro.id);
        productlistpost.map((pro) => {delete pro.id})
        // console.log(">>productlistpost",productlistpost)
        fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${utoken}`,
            },
            body: JSON.stringify({
                // totalAmount: totalAmount,
                products: [...productlistpost]
                // products: [
                //     {
                //         productID: productID,
                //         quantity: quantity,
                //         productName:productName,
                //         amount: amount,
                //     },
                // ],
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setUpdate(responseJson)
                setcartID(responseJson.id);
            })
            .catch((error) => {
                console.log(error)
            })
    };

    
    const apiUpdateCarts = (utoken,productlist,cartid) => {
        // console.log(">productlist",productlist)
       const apiURL = `https://foody-store-server.herokuapp.com/carts/${cartid}`;
        let productlistup = productlist;
        productlistup.map((pro)=>pro.productID = pro.id);
        // console.log(">>",productlistup);
        fetch(apiURL, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${utoken}`,
            },
            body: JSON.stringify({              
                products: [...productlistup]              
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                setUpdate(responseJson)
                
            })
            .catch((error) => {
                console.log(error)
            })
            
    };
      const apiDeleteCarts = (utoken,cartid) => {    
       const apiURL = `https://foody-store-server.herokuapp.com/carts/${cartid}`;   
        fetch(apiURL, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${utoken}`,
            },
          
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(">>responseJsonDelete",responseJson);
                props.delallProduct();
            })
            .catch((error) => {
                console.log(error)
            }) 
    };
    const saveCartPro = () => {
        let userToken;
        Alert.alert("Alert Title",
        "Successfully save the cart !", [{text:"OK", onPress: () => console.log("OK Pressed")}])
        async function updatecart() {
            userToken = await AsyncStorage.getItem("userToken");
            setUsertoken(userToken);
            if(cartID === ""){
                console.log(">Create Cart")
                apiPostCarts(userToken,props.cart);     
            }
            else {      
                console.log(">update Cart")    
                apiUpdateCarts(userToken,props.cart,cartID)
            }
             
        }
        updatecart();
    }
     const deleteCartPro = () => {
        let userToken;
        async function deletecart() {
            userToken = await AsyncStorage.getItem("userToken");
            setUsertoken(userToken);
            apiDeleteCarts(userToken,cartID);
             
        }
        deletecart();
        props.delallProduct();
    }
     
    // header của cart
    function renderHeaderCart(item, index) {
        return (
            <View 
                
                style={{ flexDirection: "row", height: 50 }}
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

                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft:40
                    }}
                >
                    <View
                        style={{
                            width: "50%",
                            height: "100%",
                            backgroundColor: COLORS.lightGray3,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: SIZES.radius,
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>Cart</Text>
                    </View>
                </View>
                <View 
                    style={{                       
                        justifyContent: "center",
                        alignItems: "center",
                        paddingRight:25, 
                        height:50
                }}>
                    <TouchableOpacity
                        onPress={saveCartPro}
                        style={{}}
                    >
                        <Icon
                            name="arrow-collapse-down"
                            type="MaterialCommunityIcons"
                            style={{
                                width: 30,
                                height: 28,
                            }}
                        />
                        {/* <Text style={{...FONTS.body3}}>Save</Text> */}
                    </TouchableOpacity>
                    {/* <Text>save</Text> */}
                </View>
                
                <TouchableOpacity
                    onPress={deleteCartPro}
                    style={{
                        paddingTop:10,
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: "center",
                    }}
                >
                    <Icon
                        name="delete"
                        type="AntDesign"
                        style={{
                            width: 30,
                            height: 34,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function giohangtrong() {
        return (
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        paddingTop: 50,
                    }}
                >
                    <Image
                        source={require("../../src/assets/images/nope_basket.jpg")}
                        style={{ width: 200, height: 200 }}
                    />
                </View>
                <Text
                    style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "black",
                        paddingBottom: 10,
                    }}
                >
                    {"Cart is empty"}
                </Text>

                <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: 16,
                            color: "grey",
                            width: "80%",
                            paddingBottom: 30,
                        }}
                    >
                        {"You have not added any products to your cart yet"}
                    </Text>
                </View>
            </View>
        );
    }
    //body cart
    function renderItemsCart(item, index) {
        return (
            <View key={item.id}>
                <ProductCart
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    imagesProductAdd={item.imagesProduct}
                    imagesProduct={item?.image}
                    ondecreaseProduct={() => props.decreaseProduct(item)}
                    onincreaseProduct={() => props.increaseProduct(item)}
                    ondeleteProduct={() => props.deleteProduct(item)}
                />
            </View>
            
        );
    }

    //total cart
    function renderTotalCart() {
        return (
            <View
                style={[
                    styles.rowFront,
                    {
                        marginTop: 10,
                        marginBottom: 60,
                        paddingHorizontal: width * 0.05,
                        paddingVertical: height * 0.035,
                        height: height * 0.2,
                        justifyContent: "space-between",
                       
                    },
                ]}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <Text style={{ ...FONTS.h2, color: "black" }}>
                            Total
                        </Text>
                    </View>
                    <View>
                        <Text style={{ ...FONTS.h2, color: "black" }}>
                            {`${formatCurrency(props.totalprice)}`}đ
                        </Text>     
                    </View>
                    
                </View>
                
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("Payment01")}
                    style={{
                        marginHorizontal: width * 0.15,
                        height: 40,
                        backgroundColor: COLORS.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderRadius: 20,
                    }}
                >
                    <Text style={{ color: "white", ...FONTS.h4 }}>
                        PROCEED TO PAY
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    // console.log(">>prod", props.cart)
    return (
        <SafeAreaView style={styles.container}>
           
            {/* {props.cart.map((delpro) => renderHeaderCart(delpro))} */}
            {renderHeaderCart()}
            {props.cart.length === 0 ? (
                <View>{giohangtrong()}</View>
            ) : (
                <View>
                    <ScrollView 
                        
                        nestedScrollEnabled={true}
                        style={{ height: height * 0.6 , marginTop:20}}
                    >
                        {props.cart.map((prod, index) =>
                        <View key={prod._id}>                         
                            {renderItemsCart(prod)}
                        </View>
                       
                        )}
                    </ScrollView>
                    <View style={{ height: height * 0.3 }}>
                        {renderTotalCart()}
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.lightGray2,
       
        backgroundColor:"#ffe4e1",
    },
    rowFront: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        height: 110,
        margin: 3,
        marginBottom: 15,
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});

const mapStatesToProps = (state) => {
    return {
        cart: state.cart.cartAr,
        totalprice: state.cart.totalprice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        decreaseProduct: (product_current) =>
            dispatch(decreaseProduct(product_current)),
        increaseProduct: (product_current) =>
            dispatch(increaseProduct(product_current)),
        deleteProduct: (product_current) =>
            dispatch(deleteProduct(product_current)),
        updateProduct: (product_current) =>
            dispatch(updateProduct(product_current)),
        delallProduct: () => 
            dispatch(delallProduct()),

        getCart: (product_current) => dispatch(getCart(product_current)),
        // updateCart: (products) => dispatch(updateCart(products)),
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(Cart);
