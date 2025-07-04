import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Switch, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

import '../global.css';

type Todo = {
  id?: number;
  title: string;
  details: string;
  done: boolean;
};

type Props = {
  selectedTodo: Todo | null;
  onSaved: () => void;
};

export default function TodoForm({ selectedTodo, onSaved }: Props) {
  const [todo, setTodo] = useState<Todo>({
    title: "",
    details: "",
    done: false,
  });

  const API_URL = "http://192.168.1.42:8080/todos"; // ganti IP kamu

  useEffect(() => {
    if (selectedTodo) {
      setTodo(selectedTodo);
    } else {
      setTodo({ title: "", details: "", done: false });
    }
  }, [selectedTodo]);

  const handleSubmit = async () => {
    try {
      if (todo.id) {
        await axios.put(`${API_URL}/${todo.id}`, todo);
      } else {
        await axios.post(API_URL, todo);
      }
      onSaved();
      setTodo({ title: "", details: "", done: false });
    } catch (error) {
      Alert.alert("Gagal menyimpan");
      console.error(error);
    }
  };

  return (
    <View className="mb-6 space-y-3">
      <Text className="text-xl font-bold">{todo.id ? "Edit Todo" : "Add Todo"}</Text>
      <TextInput
        className="border px-4 py-2 rounded"
        placeholder="Title"
        value={todo.title}
        onChangeText={(text) => setTodo({ ...todo, title: text })}
      />
      <TextInput
        className="border px-4 py-2 rounded"
        placeholder="Details"
        value={todo.details}
        onChangeText={(text) => setTodo({ ...todo, details: text })}
      />
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-2">
          <Text>Done</Text>
          <Switch
            value={todo.done}
            onValueChange={(val) => setTodo({ ...todo, done: val })}
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} className="bg-blue-600 px-4 py-2 rounded">
          <Text className="text-white font-bold">{todo.id ? "Update" : "Create"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
