import React, { Component, useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Modal,
    Dimensions,
    Image,
} from "react-native";
// import Modal from "react-native-modal";
import { WebView } from "react-native-webview";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import {connect} from 'react-redux'
import {
   
    delallProduct,
} from "../componets/productTag/action/index";
const { width, height } = Dimensions.get("window");
const Paypal = (props) => {
    let myWebView;

    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
   
    const posttotal = (props.route.params.price*0.00004356823).toFixed(2);
    
    const showSuccess = () => {
        props.delallProduct();
        props.navigation.navigate('Success')
    }
 
    return (
        <SafeAreaView style={[styles.container]}>
            <View
                style={{
                    flexDirection: "row",
                    height: 60,
                    borderBottomWidth: 0.3,
                    paddingBottom: 10,
                }}
            >
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
                        <Text style={{ ...FONTS.h3 }}>Payment</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: "center",
                    }}
                ></TouchableOpacity>
            </View>
            <Modal
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}
            >
                <WebView
                   ref={(el) => (myWebView = el)}
                   onLoadEnd={() => myWebView.postMessage(posttotal)}
                   source={{uri: 'http://10.0.3.2:3000'}}
                   javaScriptEnabled={true}
                   onMessage={showSuccess}
                    // ref={(el) => (myWebView = el)}
                    // onLoadEnd={() => myWebView.postMessage(35)}
                    // source={{
                    //     uri: "http://10.0.3.2:3000",
                    //     headers: {
                    //         "Access-Control-Allow-Methods": "*",
                    //         "Access-Control-Allow-Origin": "*",
                    //     },
                    // }}
                    // onNavigationStateChange={(data) => handleResponse(data)}
                    // injectedJavaScript={`document.getElementById('price').value="123";document.f1.submit()`}
                />
            </Modal>

            <Image
                source={images.logo_payment}
                style={{ width: 400, height: 450, justifyContent: "center" }}
            />
            <TouchableOpacity
                style={{
                    marginHorizontal: width * 0.05,
                    marginVertical: 20,
                    height: 50,
                    backgroundColor: "#ffa07a",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderRadius: 20,
                }}
                onPress={() => setShowModal(true)}
            >
                <Text style={{ color: "black", ...FONTS.h4 }}>
                    Pay with paypal
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: COLORS.lightGray2,

        backgroundColor: "#ffe4e1",
    },
});
const mapStatesToProps = (state) => {
    return {
        cart : state.cart.cartAr, 
        totalprice: state.cart.totalprice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      delallProduct: (product_current) => dispatch(delallProduct(product_current)),
    };
  };

export default connect (mapStatesToProps,mapDispatchToProps )(Paypal);

 // const [status, setStatus] = useState("pending");
//  const handleResponse = (data) => {
//     if (data.title === "success") {
//         setShowModal(showModal), setStatus("Complete");
//         <Modal>
//             <TouchableOpacity></TouchableOpacity>
//         </Modal>
//     } else if (data.title === "cancel") {
//         setShowModal(showModal), setStatus("Canceled");
//     } else {
//         return;
//     }

// };