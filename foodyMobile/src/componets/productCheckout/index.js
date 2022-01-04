import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { imgport } from "../../config/port";

const ProductCheckout = (props) => {
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
            style={{ width: "100%", flexDirection: "row",height:100,}}
        >
            <View>
                {props.imagesProduct&&<Image
                    source={{uri:`${imgport}${props.imagesProduct}.png`}}
                    style={{
                        height: "90%",
                        width: 100,
                        resizeMode: "cover",
                        marginLeft:10
                    }}
                />}
                {props.imagesProductAdd&&
                  <Image
                  source={{uri:`${imgport}${props.imagesProductAdd}.png`}}
                  style={{
                      height: "90%",
                      width: 100,
                      resizeMode: "cover",
                      marginLeft:10
                  }}
                    />  
                }
            </View>
            <View
                style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '70%',
                    }}
                >
                <View style={{paddingLeft: 28, paddingTop: 10}}>
                    <Text style={{color: 'grey', fontSize: 20, paddingBottom: 5}}>
                        {props.name}
                    </Text>
                    <Text style={{...FONTS.h4, color: 'black', fontSize: 20}}>
                        {`${formatCurrency(props.price)}`}đ
                    </Text>
                </View>

                <View style={{paddingTop: 45}}>
                    <Text style={{color: 'grey', fontSize:15}}>
                        {`${props.quantity}x`}  
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    
});

export default ProductCheckout;
