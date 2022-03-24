import React from 'react'
import {View, FlatList, Text, StyleSheet, Button, TouchableOpacity, ImageBackground}from 'react-native'
import { MEALS } from '../data/dummy-data'
import {useSelector} from 'react-redux'

const FavouritesScreen = (props) => {
    const favouriteMeals = useSelector(state => state.meal.favouriteMeals)
    const renderMealItem = itemData => {
        return (
            <TouchableOpacity onPress={() =>  {props.navigation.navigate({
                routeName: 'MealDetail', 
                params: {mealId: itemData.item.id, mealTitle: itemData.item.title}
            })}}>
            <View style={styles.mealItem} >
                <View style={{...styles.mealRow, ...styles.mealHeader}}>
                    <ImageBackground source={{uri: itemData.item.imageUrl}} style={styles.bgImage}>
                    <Text numberOfLines={1} style={styles.title}>{itemData.item.title}</Text>
                    </ImageBackground>
                </View>
                <View style={{...styles.mealRow, ...styles.mealDetail}}>
                    <Text>{itemData.item.duration}m</Text>
                    <Text>{itemData.item.complexity.toUpperCase()}</Text>
                    <Text>{itemData.item.affordability.toUpperCase()}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }

    if (favouriteMeals.length == 0 || !favouriteMeals) { 
        return (
            <View style={styles.screen} ><Text style={styles.title}>No Favourite Meals Found. Start Adding Some!</Text></View>
        )
    } else {
        return (
            <View style={styles.screen}>
                <FlatList 
                    keyExtractor={(item, index) => item.id}
                    data={favouriteMeals}
                    renderItem={renderMealItem}
                    style={{width: '100%', padding: 10}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    screen : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    mealRow: {
        flexDirection: 'row'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center'
    }
})

export default FavouritesScreen