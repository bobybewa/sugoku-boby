import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from './screens/gameScreen'
import HomeScreen from './screens/homeScreen'
import FinishScreen from './screens/finishScreen'
const Stack = createStackNavigator()

// test
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Game" component={GameScreen} option={{headerShown: false}}/>
          <Stack.Screen name="Finish" component={FinishScreen} option={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}