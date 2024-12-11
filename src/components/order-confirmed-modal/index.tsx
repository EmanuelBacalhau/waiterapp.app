import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { CheckCircle } from '../icons/check-circle';

type Props = {
  visible: boolean;
  onOk: () => void;
};

export const OrderConfirmedModal = ({ visible, onOk }: Props) => {
  return (
    <Modal visible={visible} animationType="fade">
      <View className="bg-red-600 flex-1 items-center justify-center ">
        <CheckCircle />

        <Text className="font-general-bold text-2xl text-white mt-3">
          Pedido confirmado!
        </Text>

        <Text className="text-white font-general-regular text-center opacity-70">
          Seu pedido foi confirmado com sucesso e já está sendo preparado.
        </Text>

        <TouchableOpacity
          className="rounded-full bg-white px-6 py-3 mt-4"
          onPress={onOk}
        >
          <Text className="text-red-600 font-general-semibold text-base">
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
