import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApartmentsListing from './src/screens/ApartmentsListing/ApartmentsListing';
import ApartmentDetails from './src/screens/ApartmentDetails/ApartmentDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Apartments" 
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#1976D2' },
          }}
          >
          <Stack.Screen name="Apartments" component={ApartmentsListing} />
          <Stack.Screen name="Apartment Details" component={ApartmentDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
