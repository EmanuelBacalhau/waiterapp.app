import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../button';
import { Close } from '../icons/close';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
};

export const TableModal = ({ visible, onClose, onSave }: Props) => {
  const isAndroid = Platform.OS === 'android';
  const [table, setTable] = useState<string>('');

  const handleSaveTable = (table: string) => {
    onSave(table);
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <KeyboardAvoidingView
        behavior={isAndroid ? 'height' : 'padding'}
        className="bg-black/60 flex-1 items-stretch justify-center p-6"
      >
        <View className="bg-white rounded-lg p-6">
          <View className="flex-row justify-between items-center">
            <Text className="font-general-bold text-lg">Informe a mesa</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </View>

          <View className="mt-8">
            <TextInput
              placeholder="Número da mesa"
              className="border border-black/50 rounded-lg p-4 mb-6"
              keyboardType="number-pad"
              onChangeText={setTable}
            />

            <Button disabled={!table} onPress={() => handleSaveTable(table)}>
              Salvar
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
