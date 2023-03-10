import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AppStack = createNativeStackNavigator()

import Incidents from './pages/Incidents'
import Details from './pages/Details'

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name='Incidents' component={Incidents} />
        <AppStack.Screen name='Detail' component={Details} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}