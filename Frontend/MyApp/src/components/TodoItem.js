import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={() => onToggle(todo.id)}>
        <View style={[styles.checkboxInner, todo.completed && styles.checked]} />
      </TouchableOpacity>
      <Text style={[styles.title, todo.completed && styles.completed]}>
        {todo.title}
      </Text>
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8, marginBottom: 10 },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#007AFF', marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  checkboxInner: { width: 12, height: 12, borderRadius: 6 },
  checked: { backgroundColor: '#007AFF' },
  title: { flex: 1, fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: '#999' },
  delete: { color: '#FF3B30', fontSize: 20, fontWeight: 'bold' },
});