import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

// Enable react-native-screens for optimization
enableScreens();

function HomeScreen({ navigation }: { navigation: any }): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Details')}>
        Go to Details
      </Text>
    </SafeAreaView>
  );
}

function DetailsScreen({ navigation }: { navigation: any }): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Home')}>
        Go Back to Home
      </Text>
    </SafeAreaView>
  );
}

// Create Native Stack Navigator
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default App;
