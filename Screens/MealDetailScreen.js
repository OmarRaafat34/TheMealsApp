import React, {useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from '../Components/HeaderButton' 
import { useSelector, useDispatch } from 'react-redux'
import {toggleFavourite} from '../store/actions/meals'

const MealDetailScreen = (props) => {
    const mealDetails = useSelector(state=> state.meal.meals)
    const mealId = props.navigation.getParam('mealId')   
    const currentMealIsFavourite = useSelector(state=> state.meal.favouriteMeals.some(meal=> meal.id === mealId)) 
    const selectedMeal = mealDetails.find(meal => meal.id === mealId)
    const dispatch = useDispatch()
    
    const toggleFavouriteHandler = useCallback(() => {
        dispatch(toggleFavourite(mealId))
    }, [dispatch, mealId])
    
    useEffect(()=> {
        props.navigation.setParams({toggleFav: toggleFavouriteHandler})
    }, [toggleFavouriteHandler])
    
    useEffect(()=> {
        props.navigation.setParams({isFav: currentMealIsFavourite})
    }, [currentMealIsFavourite])

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <Text>{selectedMeal.duration}m</Text>
                <Text>{selectedMeal.complexity.toUpperCase()}</Text>
                <Text>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map((ingredient) => <Text style={styles.listItem} key={ingredient}>{ingredient}</Text>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map((steps) => <Text style={styles.listItem} key={steps}>{steps}</Text>)}
        </ScrollView>
    )

}

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealTitle = navigationData.navigation.getParam('mealTitle')
    // const selectedMeal = MealName.find(meal => meal.id === mealId)
    const toggleFav = navigationData.navigation.getParam('toggleFav')
    const isFav = navigationData.navigation.getParam('isFav')
    
    return {
        headerTitle: mealTitle,
        headerRight: (() =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Favourite'
                    iconName= {isFav ? 'ios-star': 'ios-star-outline'}
                    onPress={toggleFav}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create ({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',

    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10 
    }
})

export default MealDetailScreen