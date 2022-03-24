import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryMealScreen from '../Screens/CategoryMealsScreen';
import MealDetailScreen from '../Screens/MealDetailScreen';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Colors from '../constants/Colors';
import FavouritesScreen from '../Screens/FavouritesScreen'
import FilterScreen from '../Screens/FilterScreen'
import { Ionicons } from '@expo/vector-icons';

const defaultNavStackOptions = {
    headerStyle: {
        backgroundColor: Colors.primaryColor
    }

}

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
    },
    CategoryMeals: {
        screen: CategoryMealScreen
    },
    MealDetail: {
        screen: MealDetailScreen
    },
    Filters: {
        screen: FilterScreen
    }


}, {
    mode: 'modal',
    defaultNavigationOptions: defaultNavStackOptions
})

const favNavigator = createStackNavigator({
    Favourites: FavouritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultNavStackOptions
})

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons
                        name="ios-restaurant"
                        size={25}
                        color={tabInfo.tintColor}
                    />
                );
            }
        }
    },
    Favorites: {
        screen: favNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
                );
            },
            barStyle: {
                backgroundColor: '#000'
            }
        }
    }
}

const MealsFavTabNavigator = createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: Colors.accentColor,
    shifting: true,
    barStyle: {
        backgroundColor: '#fff'
    }
})

// const FilterNavigator = createStackNavigator({
//     Filters: FilterScreen
// })

// const MainNavigator = createDrawerNavigator({
//     MealsFavs: MealsFavTabNavigator,
//     Filters: FilterNavigator
// })

// const Drawer = createDrawerNavigator()
// function MyDrawer() {
//     return (
//       <Drawer.Navigator initialRouteName="Feed">
//         <Drawer.Screen
//           name="MealsFavs"
//           component={MealsFavTabNavigator}
//         //   options={{ drawerLabel: 'Home' }}
//         />
//         <Drawer.Screen
//           name="Filters"
//           component={MealsFavTabNavigator}
//         //   options={{ drawerLabel: 'Home' }}
//         />
//       </Drawer.Navigator>
//     );
//   }

export default createAppContainer(MealsFavTabNavigator)