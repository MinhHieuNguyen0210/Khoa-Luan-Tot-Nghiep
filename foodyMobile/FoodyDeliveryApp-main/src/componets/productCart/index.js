import React from "react";
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Image,
} from "react-native";
import { Icon } from "native-base";
import { icons, images, SIZES, COLORS, FONTS } from "../../constants";
import {connect} from 'react-redux'

import { imgport } from "../../config/port";
import {
    deleteProduct, 
    increaseProduct, 
    decreaseProduct,
} from '../productTag/action/index'
import styles from "./style";

const {width, height} = Dimensions.get('window');
const ProductCart = (props) => {
    const formatCurrency = (monney) => {
        const mn = String(monney);
        return mn
          .split('')
          .reverse()
          .reduce((prev, next, index) => {
            return (index % 3 ? next : next + '.') + prev;
          });
      };
    return (
        <View style={[styles.rowFront, { flexDirection: "row", paddingTop:15, backgroundColor:COLORS.lightGray2}]}>
            {/* image */}
            <View
                style={{
                    width: width * 0.3,
                }}
            >
                {props.imagesProduct&&<Image
                   source={{
                    uri: `${imgport}${props.imagesProduct}.png`,
                    }}
                    style={{
                        width: width * 0.2,
                        height: height * 0.1,
                        marginLeft:10
                    }}
                />}
                {props.imagesProductAdd&&<Image
                   source={{
                    uri: `${imgport}${props.imagesProductAdd}.png`,
                    }}
                    style={{
                        width: width * 0.2,
                        height: height * 0.1,
                        marginLeft:10
                    }}
                />}
            </View>
            {/* infomation item */}
            <View
                style={{
                    width: width * 0.5,
                    height: height * 0.08,
                    justifyContent: "space-between",
                }}
            >
                <Text style={{ ...FONTS.body2 }}>{props.name}</Text>
                <Text style={{ ...FONTS.h4 }}>{`${formatCurrency(props.price)}`}đ</Text>
            </View>

            {/* button xoa item */}

            <TouchableOpacity
                style={{
                    // backgroundColor:'red',
                    marginBottom: 50,
                    marginLeft: 30,
                }}
                onPress={() => props.ondeleteProduct()}
            >
                <Icon name="highlight-remove" type="MaterialIcons" style={{color:'#EB9239'}} />
            </TouchableOpacity>

            {/* button + -  */}
            <View
                style={{
                    position: "absolute",
                    width: width * 1.65,
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    paddingTop: 30,
                    // backgroundColor:'red',
                }}
            >
                <TouchableOpacity 
                    style={styles.btn_tru}
                    onPress= {() => props.ondecreaseProduct()}
                >
                    <Text style={{ ...FONTS.h3 }}>-</Text>
                </TouchableOpacity>

                <View
                    style={styles.valQuantity}
                >
                    <Text style={{ ...FONTS.h3 }}>
                        {props.quantity}
                    </Text>
                </View>

                <TouchableOpacity 
                    style={styles.btn_cong}
                    onPress={() => props.onincreaseProduct()}
                >
                    <Text style={{ ...FONTS.h3 }}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const mapStatesToProps = (state) => {
    return {
        cart : state.cart.cartAr, 
        totalprice: state.cart.totalprice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        decreaseProduct : (product_current) => dispatch(decreaseProduct(product_current)),
        increaseProduct : (product_current) => dispatch(increaseProduct(product_current)),
        deleteProduct : (product_current) => dispatch(deleteProduct(product_current)),
    }
}
export default connect (mapStatesToProps, mapDispatchToProps)(ProductCart);
