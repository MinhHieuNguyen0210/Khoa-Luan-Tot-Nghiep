import React, {useState, useEffect} from 'react';
import {View,Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions,FlatList, TextInput, Alert} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
const{width, height} = Dimensions.get('window');


const EditProfile = ({navigation}) => {
    const productURL = "https://foody-backend.herokuapp.com/products";
    const [data, setData] = useState([])

    useEffect(() => { 
        fetch(productURL)
        .then(response => response.json())
        .then((reponseJson) => setData(reponseJson))
        .catch((error) => alert(error))
    })

    function renderHeaderEditProfile() {
        return (
            <View style={{ flexDirection: "row", height: 50 }}>
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
                        <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
                    </View>
                </View>

                <View
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: "center",
                    }}
                >
                </View>
            </View>
        );
    }
    
    const renderItem = ({item}) => (
        <View>       
               <Text>{item.title}</Text>      
        </View>
    );


    function renderProduct(){
        return(
            <FlatList 
                data={data}
                keyExtractor={({id}, key) => id}
                renderItem = {renderItem}
            />
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeaderEditProfile()}
            {renderProduct()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }, 
})

export default EditProfile;

// ===================================================================
// PHẦN NÀY LÀ CỦA USER BỎ ĐI 
//===================================================================
{/* <TouchableOpacity 
                    onPress={() => navigation.navigate('ManageAddress')}
                    style={styles.rowFront}
                >
                    <View style={{width:40,paddingLeft:5}}>
                        <Icon
                            name="home"
                            type="FontAwesome"
                            style={{color:COLORS.primary}}
                        />
                    </View>
                    <Text style={{...FONTS.body2,width:260, paddingLeft:20, }}>
                        Manage Address
                    </Text>
                    <View style={{width:60, }}>
                        <Icon
                            name="navigate-next"
                            type="MaterialIcons"
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rowFront}>
                    <View style={{width:40,paddingLeft:5}}>
                        <Icon
                            name="heart-circle"
                            type="Ionicons"
                            style={{color:COLORS.primary}}
                        />
                    </View>
                    <Text style={{...FONTS.body2,width:260, paddingLeft:20, }}>
                        Favorites
                    </Text>
                    <View style={{width:60, }}>
                        <Icon
                            name="navigate-next"
                            type="MaterialIcons"
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Settings')}
                    style={styles.rowFront}
                >
                    <View style={{width:40,paddingLeft:5}}>
                        <Icon
                            name="player-settings"
                            type="Fontisto"
                            style={{color:COLORS.primary}}
                        />
                    </View>
                    <Text style={{...FONTS.body2,width:260, paddingLeft:20, }}>
                        Setting
                    </Text>
                    <View style={{width:60, }}>
                        <Icon
                            name="navigate-next"
                            type="MaterialIcons"
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    // ĐỂ TẠM LOGOUT VÀO ĐÂY
                    onPress={() => signOut()}
                    style={{
                        flexDirection:'row',
                        marginTop:20,
                        marginHorizontal:width*0.27,
                        height:40,
                        backgroundColor:COLORS.primary,
                        justifyContent:'space-evenly',
                        alignItems:'center', 
                        borderWidth:0.5,
                        borderRadius:20,
                    }}
                >
                        <Icon
                            name="power-off"
                            type="FontAwesome"
                            style={{color:COLORS.lightGray2}}
                        />
                        <Text style={{...FONTS.h4, color:COLORS.lightGray2}}>Log Out</Text>
                </TouchableOpacity> 
            */}