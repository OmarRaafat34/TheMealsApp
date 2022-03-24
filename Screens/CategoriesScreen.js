import React from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Button, Platform, TouchableNativeFeedback }from 'react-native'
import {CATEGORIES} from '../data/dummy-data'
import Colors from '../constants/Colors'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../Components/HeaderButton'

const CategoriesScreen = (props) => {

    TouchableCmp= TouchableOpacity
    if(Platform.OS === 'android' && Platform.Version>= 21) { 
        TouchableCmp=TouchableNativeFeedback
    }
    
    const renderGridItem = (itemData) => {
        return (
            <View style={styles.gridItem} >
            <TouchableCmp
                style={{flex: 1}} 
                onPress={()=> 
                    {props.navigation.navigate({
                        routeName: 'CategoryMeals', 
                        params: {categoryId: itemData.item.id}
                    })
                }}
            >
                <View style={{...styles.container, ...{backgroundColor: itemData.item.color}}}>
                    <Text style={styles.title} numberOfLines={2}>{itemData.item.title}</Text>
                </View>
            </TouchableCmp>
            </View>
        );
    };
    
    return (
            <View style={styles.screen}>
                <Button title='go to filters!' onPress={() => {props.navigation.navigate('Filters')}}/>
                <FlatList 
                    keyExtractor={(item, index) => item.id} 
                    numColumns={2} 
                    data={CATEGORIES} 
                    renderItem={renderGridItem}
                />
            </View>

    )

}

CategoriesScreen.navigationOptions = navData => {
    return {
        headerLeft: (() =>  
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
            title='Menu'
            iconName='ios-menu'
            onPress={() => {
                // navData.navigation.toggleDrawer()
            }}
            />
        </HeaderButtons>
    )
    }
}

const styles = StyleSheet.create ({
    screen: {
        flex: 1
    },  
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        // overflow: 'hidden'
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation: 8,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,

    }
})

export default CategoriesScreen