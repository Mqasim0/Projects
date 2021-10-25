import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AddressScreen from './src/Components/AddressScreen';
// import AnimatedMarkers from './src/Components/AnimatedMarkers';
import Map from './src/Components/Map';
import Map_Gli from './src/Components/Map_Gli';
import NavigationApp from './src/Components/NavigationApp';
// import DrawerNavigationRoutes from './src/Screen/DrawerNavigationRoutes';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Address">
        <Stack.Screen
          name="Address"
          component={AddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MapScreen"
          component={Map}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
