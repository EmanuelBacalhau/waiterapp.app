import { useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Platform } from 'react-native';
import { Button } from '../components/button';
import { Cart } from '../components/cart';
import { Categories } from '../components/categories';
import { Header } from '../components/header';
import { Menu } from '../components/menu';
import { TableModal } from '../components/table-modal';
import { useOrder } from '../context/order-context';

export const Main = () => {
  const isAndroid = Platform.OS === 'android';
  const statusbarHeight = isAndroid ? StatusBar.currentHeight : 0;
  const { table, addTable, clearTable } = useOrder();
  const [isTableModalVisible, setIsTableModalVisible] =
    useState<boolean>(false);

  const handleOpenTableModal = () => {
    setIsTableModalVisible(true);
  };

  const handleCloseTableModal = () => {
    setIsTableModalVisible(false);
  };

  return (
    <>
      <SafeAreaView
        className="flex-1 bg-gray-50"
        style={{ marginTop: statusbarHeight }}
      >
        <Header selectedTable={table} onCancelOrder={clearTable} />

        <View className="px-6 flex-1">
          <View className="h-20 mt-9">
            <Categories />
          </View>

          <View className="flex-1 mt-6">
            <Menu isSelectedTable={!!table} />
          </View>
        </View>

        <View className="min-h-28 bg-white py-4 px-6">
          {!table && (
            <SafeAreaView>
              <Button onPress={handleOpenTableModal}>Novo pedido</Button>
            </SafeAreaView>
          )}

          {table && <Cart />}
        </View>
      </SafeAreaView>

      <TableModal
        onClose={handleCloseTableModal}
        visible={isTableModalVisible}
        onSave={addTable}
      />
    </>
  );
};
