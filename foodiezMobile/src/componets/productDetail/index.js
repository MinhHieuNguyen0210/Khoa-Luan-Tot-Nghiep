import {ListItem} from "native-base"
import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { icons, images, SIZES, COLORS, FONTS } from "../../constants";
import { Icon } from "native-base";

const ProductDetail = (props) => {
    return (
        <View>
            <Text style={{ ...FONTS.h3}}>Information Order</Text>
            <ListItem style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                    <Text style={{color:COLORS.darkgray}}>Receiver</Text>
                    <Text style={{...FONTS.body3}}>{props.fullName}</Text>
                </View>
                <View>
                    <Text style={{color:COLORS.darkgray}}>Phone Number</Text>
                    <Text style={{...FONTS.body3}}>{props.phoneNumber}</Text>
                </View>
            </ListItem >
            <ListItem style={{flexDirection:'column', alignItems:'flex-start'}}>
                <Text style={{color:COLORS.darkgray}}>Address</Text>
                <Text style={{...FONTS.body3}}>{props.address}</Text>
            </ListItem>
            <ListItem style={{flexDirection:'row' , justifyContent:'space-between'}}>
                <View>
                    <Text style={{color:COLORS.darkgray}}>Status:</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name="checkmark-done-circle"
                            type="Ionicons"
                        />
                        <Text style={{...FONTS.body3}}>{props.status}</Text>
                    </View>
                </View>
                <View>
                <Text style={{color:COLORS.darkgray}}>Payment:</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon
                            name="payment"
                            type="MaterialIcons"
                        />
                        <Text style={{...FONTS.body3}}>{props.paymentType}</Text>
                    </View>
                </View>
               
            </ListItem>
            <View style={{
                    backgroundColor: COLORS.lightGray3,
                    height:5,
                    marginTop:10,
                    // marginBottom:10
                }}>
            </View>  
            
        </View>
        
        
    );
}

const styles = StyleSheet.create({})

export default ProductDetail;
