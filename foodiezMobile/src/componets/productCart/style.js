import { StyleSheet, Dimensions } from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from "../../constants";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    rowFront: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        height: 110,
        margin: 3,
        marginBottom: 15,
        paddingTop:10, 
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    btn_tru: {
        width: 30,      
        backgroundColor: "#EB9239",
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    btn_cong: {
        width: 30,   
        backgroundColor: "#EB9239",
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    valQuantity: {
        width: 30,      
        backgroundColor: "#ffb460",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default styles;
