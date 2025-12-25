// App.js
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SplashScreen from './src/Screen/SplashScreen/Index';

// Auth
import Login from './src/Auth/Login';

// Drawer Navigation
import MainDrawer from './src/Navigation/MainDrawer';

// Pages
import AddLoan from './src/Screen/AddLoan/Index';
import LoanEMIDetails from './src/Screen/LoanEMIDetails/Index';

const Stack = createStackNavigator();

const App = () => {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // show splash for 5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#51b05e" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {showSplash ? (<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ presentation: 'modal', animationTypeForReplace: 'push', animation: 'slide_from_right' }} />) : null}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainDrawer" component={MainDrawer} />
          <Stack.Screen name="AddLoan" component={AddLoan} />
          <Stack.Screen name="LoanEMIDetails" component={LoanEMIDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;