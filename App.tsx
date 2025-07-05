import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View, Alert } from "react-native";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import axios from "axios";

import './global.css';

type Todo = {
  id?: number;
  title: string;
  details: string;
  done: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [refresh, setRefresh] = useState(false);

  const API_URL = "http://192.168.1.7:8080/todos"; // Ganti dengan IP lokal kamu

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const handleSave = () => {
    setSelectedTodo(null);
    setRefresh(!refresh);
    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (err) {
      Alert.alert("Gagal menghapus");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-16">
      <ScrollView>
        <TodoForm selectedTodo={selectedTodo} onSaved={handleSave} />
        <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
      </ScrollView>
    </SafeAreaView>
  );
}
