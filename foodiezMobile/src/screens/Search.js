import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView, TouchableOpacity,FlatList, TextInput, ScrollView } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from "../constants";

import ProductSearch from '../componets/productSearch/index';
const Search = (props) => {
    const [masterData, setmasterData] = useState([]);
    const [filterData, setfilterData] = useState([])
    const [search, setSearch] = useState('')
    
    useEffect(() => {
        listProduct()
        return () => {}
    },[]);
    const listProduct = () => {
        const apiURL = 'https://foody-store-server.herokuapp.com/products'
        fetch(apiURL)
            .then((response) => response.json())
            .then((responseJson) => {
                setmasterData(responseJson);
                setfilterData(responseJson);
            })
            .catch((e) => console.log(e))
    }

    const searchFilter = (text) => {
        if (text) {
            const arrPro = masterData.filter((item) => {
                    const itemDate = item.name 
                            ?item.name.toUpperCase() 
                            : ''.toUpperCase()
                    const textData = text.toUpperCase() ;
                    return itemDate.indexOf(textData) > -1 ;
               
            })
            setfilterData(arrPro);
            setSearch(text);
        }
        else{
            setfilterData(masterData)
            setSearch(text);
        }
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: "row", height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: "center",
                    }}
                ></TouchableOpacity>

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
                        <Text style={{ ...FONTS.h3 }}>
                            Search
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    // onPress={() => navigation.navigate('Cart')}
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: "center",
                    }}
                ></TouchableOpacity>
            </View>
        );
    } 

    function renderBody() {
        const renderItem = ({item}) => {
            return(
                <View>
                    <ProductSearch
                        onclickProduct={() => onclickProduct(item)}
                        key={item.id}
                        name={item.name}
                    />
                </View>
            )
        }
          
        const onclickProduct = (prod) => {
            props.navigation.navigate('Restaurant', prod)
        }
        return(
            <View style={{paddingHorizontal:10, marginTop:20}}>
                <TextInput
                    placeholder="Search products..."
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                    style={{
                        height:50,
                        borderWidth:1,
                        borderRadius:5,
                        paddingLeft:10,
                        backgroundColor: COLORS.lightGray3,
                    }}           
                />
                <FlatList
                    data={filterData}
                    keyExtractor={(item) =>item.id}
                    renderItem={renderItem}
                    style={{marginTop:20}}
                />
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderBody()}
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffe4e1",
    },
})

export default Search;
