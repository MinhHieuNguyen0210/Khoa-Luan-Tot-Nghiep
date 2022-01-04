import React, { useState } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    Alert,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,
} from "react-native";
import { Icon } from "native-base";
import {
    getCart
} from "../componets/productTag/action/index";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import Users from "../model/Users";
import { AuthContext } from "../componets/context";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");
const Login = ({ navigation,getCart }) => {
    const { signIn } = React.useContext(AuthContext);
    const [usertoken, setUsertoken] = useState("");
    const [data, setData] = React.useState({
        username: "",
        password: "",
        check_textInputChange: false,
        secureTextEntry: true,
    });

    const login = (identifier, password) => {
        // console.log(">>login",identifier,password);
        const apiURL = "https://foody-store-server.herokuapp.com/auth/local";
        fetch(apiURL, {
            method: "POST",
            body: JSON.stringify({
                identifier: identifier,
                password: password,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson?.statusCode != 400) {
                    setUsertoken(responseJson.jwt);
                    console.log(responseJson);
                    const foundUser = [{username: responseJson.user.username,userToken:responseJson.jwt }]
                    signIn(foundUser);
                    getCart(responseJson.jwt);
                }
                else{
                    Alert.alert(
                        "Wrong Input!",
                        "Username or password field cannot be empty.",
                        [{ text: "Okay" }]
                    );  
                }     
            })
            .catch((error) => {
                // Alert.alert(
                //     "Invalid User!",
                //     "Username or password is incorrect.",
                //     [{ text: "Okay" }]
                // );
              console.log(error);
            });
    };


    const textInputChange = (val) => {
        if (val.lenght != 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
            });
        }
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    };
    function renderMainLogin() {
        return (
            <View style={{ alignItems: "center" }}>
                <Text
                    style={{
                        ...FONTS.h1,
                        color: COLORS.primary,
                        paddingTop: SIZES.padding * 10,
                        fontSize: 50,
                    }}
                >
                    Foodiez
                </Text>

                {/* nhập email pass */}
                <TextInput
                    style={[
                        styles.textinput,
                        { marginTop: 50, borderWidth: 0.7 },
                    ]}
                    placeholder="Username"
                    onChangeText={(val) => textInputChange(val)}
                />
                <View style={([styles.textinput], [styles.eyepassword])}>
                    <TextInput
                        style={[
                            styles.textinput,
                            {
                                marginRight: 10,
                                width: width * 0.74,
                                borderRightWidth: 0,
                            },
                        ]}
                        placeholder="Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        onChangeText={(val) => handlePasswordChange(val)}
                    />

                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                        style={{ justifyContent: "center", paddingRight: 25 }}
                    >
                        {data.secureTextEntry ? (
                            <Icon name="eye-off" size={20} />
                        ) : (
                            <Icon name="eye" size={20} />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Nut button login */}
                <TouchableOpacity
                    onPress={() => {
                        login(data.username, data.password);
                    }}
                    style={[{ backgroundColor: COLORS.primary }, styles.button]}
                >
                    <Text
                        style={{
                            ...FONTS.h1,
                            color: COLORS.white,
                            fontSize: 15,
                        }}
                    >
                        SIGN IN
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                    style={[
                        styles.button,
                        {
                            backgroundColor: COLORS.secondary,
                            borderWidth: 0.1,
                            borderRadius: 2,
                        },
                    ]}
                >
                    <Text
                        style={{
                            ...FONTS.h1,
                            color: COLORS.primary,
                            fontSize: 15,
                        }}
                    >
                        SIGN UP
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPassword")}
                >
                    <Text style={{ color: "#E8883E", paddingTop: 15 }}>
                        Forgot Password ?
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderMainLogin()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
    },
    textinput: {
        width: width * 0.9,
        height: height * 0.07,
        borderRadius: 5,
        borderWidth: 0.5,
        paddingLeft: 10,
    },
    eyepassword: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        height: height * 0.07,
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 5,
    },
    button: {
        width: width * 0.9,
        height: height * 0.06,
        borderRadius: 5,
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
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
        getCart : (usertoken) => dispatch(getCart(usertoken))
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(Login);

