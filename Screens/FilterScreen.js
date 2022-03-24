import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, Switch}from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../Components/HeaderButton'
import { useDispatch } from 'react-redux'
import {setFilters} from '../store/actions/meals'

const FilterScreen = props => {
    const { navigation } = props
    const [isGlutenFree, setIsGlutenFree] = useState(false)
    const [isLactoseFree, setIsLactoseFree] = useState(false)
    const [isVegan, setIsVegan] = useState(false)
    const [isVegeterian, setIsVegeterian] = useState(false)

    const dispatch = useDispatch()
    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree, 
            vegan: isVegan,
            vegeterian: isVegeterian,
        }
        dispatch(setFilters(appliedFilters))
    }, [isGlutenFree, isLactoseFree, isVegan, isVegeterian, dispatch]) 

    useEffect (()=> {
        navigation.setParams({save: saveFilters})
    }, [saveFilters])

    const FilterSwitch = props => {
        return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                value={props.state} 
                onValueChange={props.onChange} 
            />
        </View>
        )
    }
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch 
                label = 'Gluten-free'
                state={isGlutenFree}
                onChange={valueChange => setIsGlutenFree(valueChange)}
            />
            <FilterSwitch 
                label = 'Lactose-free'
                state={isLactoseFree}
                onChange={valueChange => setIsLactoseFree(valueChange)}
            />
            <FilterSwitch 
                label = 'Vegan'
                state={isVegan}
                onChange={valueChange => setIsVegan(valueChange)}
            />
            <FilterSwitch 
                label = 'Vegeterian'
                state={isVegeterian}
                onChange={valueChange => setIsVegeterian(valueChange)}
            />
        </View>
    )

}

FilterScreen.navigationOptions = navigationData => { 
    return {
        headerRight: (() =>  
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                title='Save'
                iconName='ios-save'
                onPress={navigationData.navigation.getParam('save')}
                />
            </HeaderButtons>
        )    
    }

}

const styles = StyleSheet.create ({
    screen : {
        flex: 1,
        // alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    }
})

export default FilterScreen