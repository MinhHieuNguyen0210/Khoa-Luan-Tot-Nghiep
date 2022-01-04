import React ,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image,TextInput, Dimensions, Alert} from 'react-native';
import {Icon} from 'native-base';
import { icons, images, SIZES, COLORS, FONTS } from '../constants';

const {width, height} = Dimensions.get('window');
const Register = ({navigation}) => {

    const [data, setData] = React.useState({
        username: "",
        email:"",
        password: "",
        confirmPassword:"",
        check_textInputChange: false,
        check_textChangeUsername:false,
        secureTextEntry01: true,
        secureTextEntry02: true,
    });

    // useEffect(() => {
    //     getAPIRegister()
    //     return () => {
    //     }
    // },[])

    const getAPIRegister = (email, password, username) => {
        const apiURL = "https://foody-store-server.herokuapp.com/auth/local/register"
        fetch(apiURL, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                username: username,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log(responseJSON)
            })
            .catch((error) => {
               Alert.alert(
                    "Invalid User!",
                    "Username or password is incorrect.",
                    [{ text: "Okay" }]
                );
            })
    }

// header
    function renderHeaderRegister() {
        
        return(
            <View 
                style={{
                    height:'10%',
                    backgroundColor:COLORS.primary, 
                    flexDirection:'row',
                }}>
                    <TouchableOpacity
                        onPress = {() => navigation.navigate('Login')}
                        style={{
                            paddingLeft:SIZES.padding * 2,
                            justifyContent:'center'
                        }}
                    >
                        <Icon
                            name='arrow-back-sharp'
                            type='Ionicons'
                            style={{
                                width:30,
                                height:30, 
                                color:COLORS.lightGray2, 
                            }}
                        />
                    </TouchableOpacity>
                    
                        <Text 
                            style={{
                                ...FONTS.h1,
                                paddingLeft:100,
                                alignSelf:'center', 
                                color:COLORS.lightGray2
                            }}
                        >
                            Register
                        </Text>
                    
                    
             </View>
        );
    }

    const textChangeUsername = (val) => {
        if(val != 0) setData({
            ...data, 
            username:val,
            check_textChangeUsername:true,
        })
        else {
            setData({
                ...data, 
                username:val,
                check_textChangeUsername:false,
            })
        }
    }
    const textInputChange = (val) => {
        if (val != 0){
            setData ({
                ...data, 
                email : val, 
                check_textInputChange : true,
            })
        }
        else{
            setData ({
                ...data,
                email : val,
                check_textInputChange : false,
            })
        }
    };
    const handlePasswordChange = (val) =>{
        setData ({
            ...data,
            password : val,
        })
    }
    const checkPassword = ()=>{
        if (data.password === data.confirmPassword)
        {
            alert('');
        }
        else {
            alert('You have successfully registered')
        }
    }
    const updateSecureTextEntry01 = () => {
        setData({
            ...data,
            secureTextEntry01: !data.secureTextEntry01,
        });
    };
    const updateSecureTextEntry02 = () => {
        setData({
            ...data,
            secureTextEntry02: !data.secureTextEntry02,
        });
    };
    function renderMainRegister() {
        const success = () => {
            Alert.alert(
                "",
                "success !",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            )
        }
        return(
            <View style={{alignItems:'center'}}>
                <Text 
                    style={{
                        ...FONTS.h1,
                        color:COLORS.primary,
                        paddingTop:SIZES.padding*10,
                        fontSize:50                   
                    }}
                >
                    Foodiez
                </Text>

                {/* input infomation */}
                <TextInput
                    style={[
                        styles.textinput,
                    ]}
                    placeholder='UserName'
                    onChangeText={(val) => textChangeUsername(val) }
                />
                <TextInput
                    style={[
                        styles.textinput,
                    ]}
                    placeholder='Email'
                    onChangeText={(val) => textInputChange(val) }
                    
                />
                <View style={([styles.textinput], [styles.eyepassword])}>
                    <TextInput
                        style={[
                            styles.textinput,  
                            {
                                marginRight: 10,
                                width: width * 0.74,
                                borderRightWidth: 0,
                                marginTop:0,
                            },     
                        ]}
                        placeholder='Password'
                        secureTextEntry={data.secureTextEntry01 ? true : false}
                        onChangeText={(val) => handlePasswordChange(val) }
                    />
                    <TouchableOpacity
                        style={{ justifyContent: "center", paddingRight: 25 }}
                        onPress={updateSecureTextEntry01}
                    >
                        {data.secureTextEntry01 ? (
                            <Icon name="eye-off" size={20} />
                        ) : (
                            <Icon name="eye" size={20} />
                        )}
                        
                    </TouchableOpacity>
                </View>
                
                <View style={([styles.textinput], [styles.eyepassword]  )}>
                    <TextInput
                        style={[
                            styles.textinput,  
                            {
                                marginRight: 10,
                                width: width * 0.74,
                                borderRightWidth: 0,
                                marginTop:0,
                            },     
                        ]}
                        placeholder='Confirm Password'
                        secureTextEntry={data.secureTextEntry02 ? true : false}
                    />
                    <TouchableOpacity
                        style={{ justifyContent: "center", paddingRight: 25 }}
                        onPress={updateSecureTextEntry02}
                    >
                        {data.secureTextEntry02 ? (
                            <Icon name="eye-off" size={20} />
                        ) : (
                            <Icon name="eye" size={20} />
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => getAPIRegister(data.email, data.password, data.username,checkPassword()) }
                    style={[
                        styles.button,
                        {backgroundColor:COLORS.primary,borderWidth:0.1},
                    ]}
                >          
                    <Text style={{...FONTS.h1,color:COLORS.white, fontSize:15}}>Register</Text>
                </TouchableOpacity>
            </View>
        );  
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeaderRegister()}
            {renderMainRegister()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex :1,
        backgroundColor:COLORS.lightGray4
    },
    textinput:{
        width:width*0.9,
        height:height*0.07,
        borderRadius:5,
        borderWidth:0.5,
        paddingLeft:10,
        marginTop:25,
    },
    eyepassword: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        height: height * 0.07,
        marginTop: 30,
        borderRadius: 5,
    },
    button:{
        width:width*0.9,
        height:height*0.06,
        borderRadius:5,
        marginTop:30,
        alignItems:'center',
        justifyContent:'center'
    },
})

export default Register;
