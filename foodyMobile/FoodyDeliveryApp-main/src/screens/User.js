import React , {useState, useEffect}from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
    TextInput,
    Alert,
    TouchableOpacity,
    Modal, 
    ScrollView, 
    Button
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from "../constants";
import {Card, Input} from "react-native-elements"
import {Icon} from "native-base"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../componets/context";


const { width, height } = Dimensions.get("window");
const User = ( props ) => {
    const [userProfile, setUserProfile] = useState({
        fName:'Nguyen Van A',
        email:'abc@gmail.com',
        phoneNumber:"0961003973", 
        address:"360/21/7B Nguyen An Ninh, P8, TP VT",
    });
    const [dataupdate, setdataupdate] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const { signOut } = React.useContext(AuthContext);
    const ProfileTag = ({iconP, iconType, titleP}) => {
        return(
            <View
            style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
            <View
              style={{
                height: 85,
                width: '90%',
      
                backgroundColor: 'white',
      
                shadowColor: 'grey',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
      
                elevation: 3,
      
                borderRadius: 5,
      
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}>
              <Icon
                style={{color: 'white', fontSize: 32, color: '#4b5d53'}}
                // name={'calendar-week'}
                name={iconP}
                type={iconType}
              />
              <View
                style={{
                  height: '100%',
                  width: '85%',
                  paddingLeft: 40,
      
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 20}}>{titleP}</Text>
                {/* <Text style={{color: 'grey'}}>{dcrP}</Text> */}
              </View>
            </View>
          </View>
        );
       
    }
    function renderHeader() {
        return (
            <View 
                style={{
                    // backgroundColor:'red', 
                    height:300,
                    paddingTop:30,
                    alignItems:'center'
                }}
            >
               <Image
                    source={images.avatar_5}
                    style={{                       
                        height:height*0.2,
                        width:width*0.3,
                    }}
               />
               <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                   <Text style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>
                       {userProfile.fName}
                   </Text>
                   <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5}}>
                       <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                           <Icon
                               style={{color: 'white', fontSize: 20, color: '#4b5d53'}}
                               name="user-edit"
                               type="FontAwesome5"
                           />
                       </TouchableOpacity>
                   </View>
               </View>
               <Text style={{
                      textAlign: 'center',
                      fontSize: 15,
                      color: 'grey',
                      fontStyle: 'italic',
                   }}>
                   {userProfile.email}
               </Text>
               <TouchableOpacity
                    onPress={(()=> props.navigation.navigate("OrderHistory")) }
                    style={{
                        flexDirection:'row', 
                        alignItems:'center',
                        borderRadius:10,
                        marginTop:10, 
                        justifyContent:'space-evenly',
                        width:165, 
                        backgroundColor:"#ffa07a"
                        
                    }}
               >
                   <Text style={{...FONTS.body2}}>Order history</Text>
                   <Icon
                        name="navigate-next"
                        type="MaterialIcons"
                   />
                </TouchableOpacity>
            </View>
        );
    }

    function renderManageUser() {
        return (
            <SafeAreaView
                style={{backgroundColor: 'white', height: '100%'}}
            >
                <Modal
                     animationType="fade"
                     transparent={true}
                     visible={modalVisible}
                     onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}
                >
                    <View 
                        style={{
                            width: '100%',
                            height: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                    >
                        <View style={{
                            width: '90%',
                            height: 450,
                            backgroundColor: 'white',

                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,

                            elevation: 5,

                            paddingTop: 10,
                            }}>
                            <View 
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                    setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Icon
                                        style={{
                                            color: 'grey',
                                            fontSize: 15,
                                            textAlign: 'left',
                                            marginLeft: 20,
                                            marginRight: 40,
                                        }}
                                        name="arrow-back"
                                        type="Ionicons"
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                    textAlign: 'center',
                                    fontSize: 20,
                                    color: 'grey',
                                    fontWeight: 'bold',
                                    }}>
                                    {'Update information'}
                                </Text>
                            </View>
                            <ScrollView>
                                <Card>
                                    <Card.Title style={{textAlign: 'left', fontSize: 18}}>
                                        {'Full name'}
                                    </Card.Title>
                                    <Card.Divider />
                                    <Input
                                        // onChangeText={(value) =>
                                        //     setdataupdate({...dataupdate, fName: value})
                                        // }
                                        placeholder={userProfile.fName}
                                    />
                                    <Card.Divider />
                                    <Card.Title style={{textAlign: 'left', fontSize: 18}}>
                                        {'Birthday'}
                                    </Card.Title>
                                    <Card.Divider />
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{width: '100%'}}>
                                            <Input
                                            // onChangeText={(value) =>
                                            //     setdataupdate({...dataupdate, birthday: value})
                                            // }
                                            keyboardType="numeric"
                                            placeholder={userProfile.birthday}
                                            />
                                        </View>
                                    </View>
                                    <Card.Divider />
                                    <Card.Title style={{textAlign: 'left', fontSize: 18}}>
                                        {'Phone number'}
                                    </Card.Title>
                                    <Card.Divider />
                                    <Input
                                        onChangeText={(value) =>
                                            setdataupdate({...dataupdate, phone: value})
                                            }
                                            placeholder={userProfile.phoneNumber}
                                    />
                                    <Card.Divider />
                                    <Card.Title style={{textAlign: 'left', fontSize: 18}}>
                                        {'Address'}
                                    </Card.Title>
                                    <Card.Divider />
                                    <Input
                                        // onChangeText={(value) =>
                                        //     setdataupdate({...dataupdate, phone: value})
                                        //     }
                                        placeholder={userProfile.address}
                                    />
                                </Card>
                            </ScrollView>

                            <Button 
                            // onPress={updateProfile} 
                            title="Cập nhật" color="#4a5d54" 
                            />
                        </View>
                    </View>
                </Modal>


                <View style={{flexDirection: 'column', paddingTop: 20}}>
                    <View style={{marginBottom: 20}}>
                    <ProfileTag
                        iconP="calendar-week"
                        iconType="FontAwesome5"
                        titleP="Birthday"
                        // dcrP={userProfile.birthday}
                    />
                    </View>
                    <View style={{marginBottom: 20}}>
                    <ProfileTag 
                        iconP="phone"
                        iconType="Entypo"
                        titleP="Phone Number"
                        // dcrP={userProfile.phone}
                    />
                    </View>
                    <View style={{marginBottom: 20}}>
                    <ProfileTag
                        iconP="address-book"
                        iconType="FontAwesome"
                        titleP="Address"
                        // dcrP={userProfile.gender}
                    />
                    </View>
                </View>
               
                <TouchableOpacity
                    // ĐỂ TẠM LOGOUT VÀO ĐÂY
                    onPress={() => signOut()}
                    style={{
                        flexDirection: "row",
                        marginTop: 30,
                        marginHorizontal: width * 0.27,
                        height: 40,
                        backgroundColor: COLORS.primary,
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        borderWidth: 0.5,
                        borderRadius: 20,
                    }}
                >
                    <Icon
                        name="power-off"
                        type="FontAwesome"
                        style={{ color: COLORS.lightGray2 }}
                    />
                    <Text style={{ ...FONTS.h4, color: COLORS.lightGray2 }}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* {renderEdit()} */}
            {renderHeader()}
            {renderManageUser()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1",
    },
    rowFront: {
        flexDirection: "row",
        paddingLeft: 20,
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 5,
        height: 50,
        margin: 3,
        marginBottom: 15,
        shadowColor: "#999",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    textinput: {
        width: width * 0.9,
        height: height * 0.07,
        borderRadius: 5,
        borderWidth: 0.5,
        paddingLeft: 10,
        marginTop: 25,
    },
    button: {
        width: width * 0.9,
        height: height * 0.06,
        borderRadius: 5,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default User;

{/* <TextInput style={[styles.textinput]} placeholder="Name" />
                <TextInput style={[styles.textinput]} placeholder="Email" />
                <TextInput
                    style={[styles.textinput]}
                    placeholder="Phone Number"
                />
                <TextInput style={[styles.textinput]} placeholder="Address" />
                <TouchableOpacity
                    title="update thanh cong"
                    onPress={() => notification()}
                    style={[
                        styles.button,
                        { backgroundColor: COLORS.primary, borderWidth: 0.1 },
                    ]}
                >
                    <Text
                        style={{
                            ...FONTS.h1,
                            color: COLORS.white,
                            fontSize: 15,
                        }}
                    >
                        UPDATE
                    </Text>
                </TouchableOpacity> */}