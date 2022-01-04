import React from "react";
import {SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from "../constants";

const Success = () => {
    return (
        <SafeAreaView
            style={{
                backgroundColor: "white",
            }}
        >
            <View style={{ height: 550 }}>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 80,
                        justifyContent: "center",
                        paddingBottom: 30,
                    }}
                >
                    <Image
                        source={images.logoSuccess}
                        style={{ width: 270, height: 250 }}
                    />
                </View>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 23,
                        fontWeight: "bold",
                        color: "#ffb460",
                    }}
                >
                    {"Thank you for shopping in our store"}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default Success;
