import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/axios';
import { Feather } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const theme = darkMode ? darkStyles : lightStyles;

  useEffect(() => {
    loadTodos();
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const saved = await AsyncStorage.getItem('darkMode');
    if (saved) setDarkMode(JSON.parse(saved));
  };

  const toggleTheme = async () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const loadTodos = async () => {
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
      await AsyncStorage.setItem('todos', JSON.stringify(res.data));
    } catch (error) {
      const saved = await AsyncStorage.getItem('todos');
      if (saved) setTodos(JSON.parse(saved));
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    const newTodo = { 
      id: Date.now().toString(), 
      title, 
      completed: false,
      createdAt: new Date().toISOString()
    };
    try {
      const res = await api.post('/todos', { title });
      const updated = [...todos, res.data];
      setTodos(updated);
      await AsyncStorage.setItem('todos', JSON.stringify(updated));
    } catch (error) {
      const updated = [...todos, newTodo];
      setTodos(updated);
      await AsyncStorage.setItem('todos', JSON.stringify(updated));
    }
    setTitle('');
  };

  const toggleTodo = async (id) => {
    const updated = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTodos(updated);
    await AsyncStorage.setItem('todos', JSON.stringify(updated));
    try {
      await api.patch(`/todos/${id}/complete`);
    } catch (error) {}
  };

  const deleteTodo = async (id) => {
    const updated = todos.filter(t => t.id !== id);
    setTodos(updated);
    await AsyncStorage.setItem('todos', JSON.stringify(updated));
    try {
      await api.delete(`/todos/${id}`);
    } catch (error) {}
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const saveEdit = async () => {
    if (!editText.trim()) return;
    const updated = todos.map(t => t.id === editingId ? { ...t, title: editText } : t);
    setTodos(updated);
    await AsyncStorage.setItem('todos', JSON.stringify(updated));
    try {
      await api.patch(`/todos/${editingId}`, { title: editText });
    } catch (error) {}
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === 'active') return !t.completed && matchesSearch;
    if (filter === 'completed') return t.completed && matchesSearch;
    return matchesSearch;
  });

  const cardColors = [
    '#67D7CC', // Pink
    
  ];

  const getCardColor = (index) => cardColors[index % cardColors.length];

  return (
    <View style={[styles.container, theme.container]}>
      {/* Header */}
      <View style={[styles.header, theme.header]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.greeting, theme.subText]}>Hello </Text>
            <Text style={[styles.headerTitle, theme.text]}>My Tasks</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={toggleTheme} style={[styles.iconBtn, theme.iconBtn]}>
              <Feather name={darkMode ? "sun" : "moon"} size={22} color={darkMode ? "#FDB813" : "#5B21B6"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={[styles.iconBtn, theme.iconBtn]}>
              <Feather name="user" size={22} color={darkMode ? "#F9FAFB" : "#111827"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Search Bar */}
        <View style={[styles.searchBar, theme.searchBar]}>
          <Feather name="search" size={20} color={darkMode ? "#9CA3AF" : "#6B7280"} />
          <TextInput
            style={[styles.searchInput, theme.text]}
            placeholder="Search tasks..."
            placeholderTextColor={darkMode ? "#6B7280" : "#9CA3AF"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {['all', 'active', 'completed'].map(f => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterChip,
                filter === f && styles.filterChipActive,
                theme.filterChip
              ]}
              onPress={() => setFilter(f)}
            >
              <Text style={[
                styles.filterText,
                filter === f && styles.filterTextActive
              ]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Grid List */}
        <FlatList
          data={[{ isAddCard: true }, ...filteredTodos]}
          keyExtractor={(item, index) => item.isAddCard ? 'add-card' : item.id}
          numColumns={2}
          contentContainerStyle={styles.gridList}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            if (item.isAddCard) {
              return (
                <View style={[styles.gridCard, styles.addGridCard, theme.addGridCard]}>
                  <View style={styles.addCardContent}>
                    <Feather name="plus-circle" size={32} color="#6366F1" style={styles.addIcon} />
                    <TextInput
                      style={[styles.addGridInput, theme.text]}
                      placeholder="Add new task..."
                      placeholderTextColor={darkMode ? "#6B7280" : "#161414ff"}
                      value={title}
                      onChangeText={setTitle}
                      multiline
                    />
                  </View>
                  <View style={styles.addCardFooter}>
                    <TouchableOpacity 
                      style={[styles.saveButton, !title.trim() && styles.saveButtonDisabled]} 
                      onPress={addTodo}
                      disabled={!title.trim()}
                    >
                      <Feather name="check" size={18} color="#FFF" />
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }

            const actualIndex = index - 1;
            const cardColor = getCardColor(actualIndex);

            return (
              <View style={[styles.gridCard, { backgroundColor: cardColor }]}>
                {editingId === item.id ? (
                  <>
                    <View style={styles.editCardContent}>
                      <TextInput
                        style={styles.editGridInput}
                        value={editText}
                        onChangeText={setEditText}
                        autoFocus
                        multiline
                      />
                    </View>
                    <View style={styles.cardFooter}>
                      <TouchableOpacity 
                        style={styles.footerBtn}
                        onPress={saveEdit}
                      >
                        <Feather name="check" size={18} color="#FFF" />
                        <Text style={styles.footerBtnText}>Save</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.footerBtn}
                        onPress={() => setEditingId(null)}
                      >
                        <Feather name="x" size={18} color="#FFF" />
                        <Text style={styles.footerBtnText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <TouchableOpacity 
                      style={styles.cardContent}
                      onPress={() => toggleTodo(item.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.checkboxArea}>
                        <View style={[
                          styles.gridCheckbox,
                          item.completed && styles.gridCheckboxChecked
                        ]}>
                          {item.completed && <Feather name="check" size={14} color="#FFF" />}
                        </View>
                      </View>
                      <Text style={[
                        styles.gridTodoText,
                        item.completed && styles.gridTodoCompleted
                      ]} numberOfLines={4}>
                        {item.title}
                      </Text>
                      <Text style={styles.gridTodoDate}>
                        {new Date(item.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.cardFooter}>
                      <TouchableOpacity 
                        style={styles.footerBtn}
                        onPress={() => startEdit(item)}
                      >
                        <Feather name="edit-2" size={16} color="#FFF" />
                        <Text style={styles.footerBtnText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.footerBtn}
                        onPress={() => deleteTodo(item.id)}
                      >
                        <Feather name="trash-2" size={16} color="#FFF" />
                        <Text style={styles.footerBtnText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            );
          }}
          ListEmptyComponent={
            filteredTodos.length === 0 && (
              <View style={styles.emptyState}>
                <Feather name="inbox" size={48} color={darkMode ? "#4B5563" : "#D1D5DB"} />
                <Text style={[styles.emptyText, theme.subText]}>
                  {searchQuery ? 'No tasks found' : 'Add your first task!'}
                </Text>
              </View>
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 20,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  filterScroll: {
    marginBottom: 20,
    flexGrow: 0,
  },
  filterContent: {
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterChipActive: {
    backgroundColor: '#6366F1',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  filterTextActive: {
    color: '#FFF',
  },
  gridList: {
    paddingBottom: 24,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    width: '48%',
    minHeight: 200,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  addGridCard: {
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  addCardContent: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    marginBottom: 12,
  },
  addGridInput: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
    minHeight: 60,
  },
  addCardFooter: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  checkboxArea: {
    marginBottom: 12,
  },
  gridCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridCheckboxChecked: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderColor: '#FFF',
  },
  gridTodoText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 22,
    marginBottom: 8,
  },
  gridTodoCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  gridTodoDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  footerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  footerBtnText: {
    color: '#eeeeeeff',
    fontSize: 13,
    fontWeight: '600',
  },
  editCardContent: {
    flex: 1,
    padding: 10,
  },
  editGridInput: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFF',
    width: '100%',
    minHeight: 100,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#111827',
  },
  subText: {
    color: '#6B7280',
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  filterChip: {
    backgroundColor: '#F3F4F6',
  },
  addGridCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  iconBtn: {
    backgroundColor: '#F3F4F6',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
  },
  header: {
    backgroundColor: '#1E293B',
  },
  text: {
    color: '#F1F5F9',
  },
  subText: {
    color: '#94A3B8',
  },
  searchBar: {
    backgroundColor: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  filterChip: {
    backgroundColor: '#1E293B',
  },
  addGridCard: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  iconBtn: {
    backgroundColor: '#334155',
  },
});