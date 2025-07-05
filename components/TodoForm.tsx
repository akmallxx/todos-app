import { useEffect, useState } from 'react';
import { Text, TextInput, View, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';

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
    title: '',
    details: '',
    done: false,
  });

  const API_URL = 'http://192.168.1.7:8080/todos'; // ganti IP kamu

  useEffect(() => {
    if (selectedTodo) {
      setTodo(selectedTodo);
    } else {
      setTodo({ title: '', details: '', done: false });
    }
  }, [selectedTodo]);

  const handleSubmit = async () => {
    try {
      if (todo.id) {
        await axios.put(`${API_URL}/${todo.id}`, todo);
      } else {
        await axios.post(API_URL, todo);
      }

      // ✅ Alert sukses setelah berhasil menyimpan
      Alert.alert('Berhasil', todo.id ? 'Todo berhasil diperbarui!' : 'Todo berhasil disimpan!');

      onSaved();
      setTodo({ title: '', details: '', done: false });
    } catch (error) {
      Alert.alert('Gagal menyimpan', 'Silakan coba lagi nanti.');
      console.error(error);
    }
  };

  return (
    <ScrollView className="space-y-5 rounded-xl">
      <Text className="text-2xl font-bold text-gray-800">
        {todo.id ? 'Edit Todo' : 'Tambah Todo'}
      </Text>

      <View>
        <Text className="mb-1 font-medium text-gray-700">Judul</Text>
        <TextInput
          className="rounded-md border border-gray-300 px-4 py-2"
          placeholder="Masukkan judul"
          value={todo.title}
          onChangeText={(text) => setTodo({ ...todo, title: text })}
        />
      </View>

      <View>
        <Text className="mb-1 font-medium text-gray-700">Deskripsi</Text>
        <TextInput
          className="h-28 rounded-md border border-gray-300 px-4 py-2 text-start"
          placeholder="Tuliskan deskripsi"
          value={todo.details}
          multiline
          textAlignVertical="top"
          onChangeText={(text) => setTodo({ ...todo, details: text })}
        />
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <Text className="font-medium text-gray-700">Selesai</Text>
          <Switch value={todo.done} onValueChange={(val) => setTodo({ ...todo, done: val })} />
        </View>

        <TouchableOpacity onPress={handleSubmit} className="rounded-md bg-blue-600 px-6 py-3">
          <Text className="font-bold text-white">{todo.id ? 'Perbarui' : 'Simpan'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
