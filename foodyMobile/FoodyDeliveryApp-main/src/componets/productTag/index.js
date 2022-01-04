import React from "react";
import {
    View,
    StyleSheet,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    Text,
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from "../../constants";
import { Icon } from "native-base";
import { imgport } from "../../config/port";
import styles from "./style";

import { connect } from "react-redux";
import { buyProduct } from "./action/index";

const { width, height } = Dimensions.get("window");
const ProductTag = (props) => {
    const formatCurrency = (monney) => {
        const mn = String(monney);
        return mn
            .split("")
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + ".") + prev;
            });
    };

    return (
        <View
            key={props.id}
            style={
                styles.product_box
                // marginBottom: SIZES.padding * 2,
                // flexDirection: "column",
                // paddingHorizontal: 10,
                // // borderWidth:0.5,
                // borderRadius:10,
                // backgroundColor:"",
            }
        >
            <View
                style={{
                    marginBottom: SIZES.padding,
                }}
            >
                {props.imagesProductAdd&&<Image
                    source={{ uri: `${imgport}${props.imagesProductAdd}.png` }}
                    resizeMode="cover"
                    style={{
                        
                        height: 160,
                        width: 175,
                        resizeMode: "cover",
                        borderTopRightRadius: 13,
                        borderTopLeftRadius: 13,
                    }}
                />}
                {props.imagesProduct&&<Image
                    source={{ uri: `${imgport}${props.imagesProduct}.png` }}
                    resizeMode="cover"
                    style={{
                        
                        height: 160,
                        width: 175,
                        resizeMode: "cover",
                        borderTopRightRadius: 13,
                        borderTopLeftRadius: 13,
                    }}
                />}
                
                    <View
                        style={{
                            width: width*0.27,
                            height: 40,
                            backgroundColor: "#ffb460",
                            borderBottomLeftRadius: 13,
                            borderBottomRightRadius: 13,
                            flexDirection: "row",
                            alignItems: "center",
                            // justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => props.onclickProduct()}
                        >
                            <Text
                                style={{
                                    // textAlign: "center",
                                    color: "white",
                                    fontFamily: "Oswald-VariableFont_wght",
                                    fontSize: 16,
                                    paddingLeft: 10,
                                    textShadowColor: "rgba(0, 0, 0, 0.8)",
                                    textShadowOffset: { width: 1, height: 1 },
                                    textShadowRadius: 5,
                                }}
                            >
                                {props.name}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            padding: 10,
                            justifyContent: "space-between",
                            alignItems:'center'
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontFamily: "Oswald-VariableFont_wght",
                                fontSize: 18,
                            }}
                        >
                            {`${formatCurrency(props.price)}`}đ
                        </Text>
                        <View
                            style={{
                                paddingTop: 6,
                                color: "white",
                                fontFamily: "Oswald-VariableFont_wght",
                                fontSize: 15,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    props.buyProduct(props);
                                }}
                            >
                                <Icon
                                    name="plus"
                                    type="Entypo"
                                    style={{
                                        color: COLORS.lightGray3,
                                        fontSize: 20,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                
            </View>

            {/* })} */}
        </View>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        buyProduct: (product_current) => dispatch(buyProduct(product_current)),
    };
};
const mapStateToProps = (state) => {
    return {
        cart: state.cart.cartAr,
        totalprice: state.cart.totalprice,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTag);
