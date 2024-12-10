import { useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Platform } from 'react-native';
import { Button } from '../components/button';
import { Categories } from '../components/categories';
import { Header } from '../components/header';
import { Menu } from '../components/menu';
import { TableModal } from '../components/table-modal';

export const Main = () => {
  const isAndroid = Platform.OS === 'android';
  const statusbarHeight = isAndroid ? StatusBar.currentHeight : 0;

  const [isTableModalVisible, setIsTableModalVisible] =
    useState<boolean>(false);

  const [selectedTable, setSelectedTable] = useState<string>('');

  const handleSaveTable = (table: string) => {
    setSelectedTable(table);
  };

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
        <Header />

        <View className="px-6 flex-1">
          <View className="h-20 mt-9">
            <Categories />
          </View>

          <View className="flex-1 mt-6">
            <Menu />
          </View>
        </View>

        <View className="min-h-28 bg-white py-4 px-6">
          {!selectedTable && (
            <SafeAreaView>
              <Button onPress={handleOpenTableModal}>Novo pedido</Button>
            </SafeAreaView>
          )}
        </View>
      </SafeAreaView>

      <TableModal
        onClose={handleCloseTableModal}
        visible={isTableModalVisible}
        onSave={handleSaveTable}
      />
    </>
  );
};
