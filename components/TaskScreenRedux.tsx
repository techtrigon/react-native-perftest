import React from 'react';
import { SafeAreaView, FlatList, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, toggleTask, deleteTask } from './store/store';
import { NavigationProp } from '@react-navigation/native';

export default function TaskScreenRedux({ navigation }: { navigation: NavigationProp<any> }) {
  const dispatch = useDispatch();
  const tasks = useSelector((stated: { tasks: { id: number; title: string; completed: boolean }[] }) => stated.tasks);
  const [taskInput, setTaskInput] = React.useState('');

  const handleAddTask = () => {
    if (taskInput.trim()) {
      dispatch(addTask(taskInput)); // action.payload = taskInput and action.type = "tasks/addTask" and state = tasks
      setTaskInput('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Redux Toolkit Task Manager</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={taskInput}
          onChangeText={setTaskInput}
          placeholder="Add Task"
          style={styles.input}
        />
        <Button title="Add" onPress={handleAddTask} />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text
              style={[
                styles.taskText,
                { textDecorationLine: item.completed ? 'line-through' : 'none' },
              ]}
              onPress={() => dispatch(toggleTask(item.id))}>
              {item.title}
            </Text>
            <Button title="Delete" onPress={() => dispatch(deleteTask(item.id))} />
          </View>
        )}
      />
      <Button title="Go to Zustand Tasks" onPress={() => navigation.navigate('Zustand')} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', marginRight: 10, padding: 8 },
  taskItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  taskText: { fontSize: 16 },
});
