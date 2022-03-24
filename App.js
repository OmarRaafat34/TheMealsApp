import 'react-native-gesture-handler';
import React, {useState} from  'react'
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import MealsNavigator from './navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens'
import {createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import mealReducer from './store/reducers/meals'


enableScreens()

const rootReducer = combineReducers({
  meal: mealReducer
})
const store = createStore(rootReducer)

const FetchFonts  = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')

  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] =useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading 
        startAsync={FetchFonts} 
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
