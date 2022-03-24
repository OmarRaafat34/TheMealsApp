import React from 'react'
import {View, Text, StyleSheet, FlatList,TouchableOpacity, ImageBackground }from 'react-native'
import {CATEGORIES } from '../data/dummy-data'
import {useSelector} from 'react-redux'

const CategoryMealScreen = (props) => {
    const availableMeals = useSelector(state => state.meal.filteredMeals)

    const catId = props.navigation.getParam('categoryId')    
    const displayMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0)
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

    return (
        <FlatList 
            keyExtractor={(item, index) => item.id}
            data={displayMeals}
            renderItem={renderMealItem}
            style={{width: '100%', padding: 10}}
        />
    )

}

CategoryMealScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId) 
    return {
        headerTitle: selectedCategory.title,
    }

}

const styles = StyleSheet.create ({
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

export default CategoryMealScreen