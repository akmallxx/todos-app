import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import '../global.css';

type Todo = {
  id?: number;
  title: string;
  details: string;
  done: boolean;
};

type Props = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

export default function TodoList({ todos, onEdit, onDelete }: Props) {
  return (
    <View className="bg-gray-50 p-4 rounded-xl">
      <Text className="text-2xl font-bold mb-4 text-gray-800">📝 Todo List</Text>

      {todos.length === 0 ? (
        <Text className="text-gray-500">Belum ada todo</Text>
      ) : (
        todos.map((todo) => (
          <View
            key={todo.id}
            className="bg-white p-4 rounded-lg mb-3 shadow-sm flex-row justify-between items-center"
          >
            <View className="flex-1 pr-4">
              <Text className="font-semibold text-lg text-gray-800">{todo.title}</Text>
              <Text className="text-sm text-gray-600 mb-1">{todo.details}</Text>
              <Text className={`text-xs font-medium ${todo.done ? "text-green-600" : "text-red-600"}`}>
                {todo.done ? "✓ Selesai" : "✗ Belum selesai"}
              </Text>
            </View>

            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={() => onEdit(todo)}
                className="bg-blue-100 p-2 rounded-full"
              >
                <Icon name="edit" size={20} color="#2563eb" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onDelete(todo.id!)}
                className="bg-red-100 p-2 rounded-full"
              >
                <Icon name="delete" size={20} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
}