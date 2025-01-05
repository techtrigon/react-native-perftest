import React from 'react';
import { SafeAreaView, FlatList, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { create } from 'zustand';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), title: task, completed: false }],
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}

export default function TaskScreenZustand({ navigation }: Props) {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskStore();
  const [taskInput, setTaskInput] = React.useState('');

  const handleAddTask = () => {
    if (taskInput.trim()) {
      addTask(taskInput);
      setTaskInput('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Zustand Task Manager</Text>
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
              onPress={() => toggleTask(item.id)}>
              {item.title}
            </Text>
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
      <Button title="Go to Redux Tasks" onPress={() => navigation.navigate('Redux')} />
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
