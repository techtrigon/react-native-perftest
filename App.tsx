import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import TaskScreenZustand from "./components/TaskScreenZustand";
import TaskScreenRedux from "./components/TaskScreenRedux";
import { Provider } from 'react-redux';
import { store } from './components/store/store';

// Enable react-native-screens for optimization
enableScreens();

function HomeScreen({ navigation }: { navigation: any }): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      <Button title="Go to Redux Tasks" onPress={() => navigation.navigate('Redux')} />
      <Button title="Go to Zustand tasks" onPress={() => navigation.navigate('Zustand')} />
    </SafeAreaView>
  );
}

function DetailsScreen({ navigation }: { navigation: any }): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Redux Tasks" onPress={() => navigation.navigate('Redux')} />
      <Button title="Go to Zustand tasks" onPress={() => navigation.navigate('Zustand')} />
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
        <Stack.Screen name="Zustand" component={TaskScreenZustand} />
        <Stack.Screen name="Redux" children={({ navigation }) => (
          <Provider store={store}>
            <TaskScreenRedux navigation={navigation} />
          </Provider>
        )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default App;
