import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Platform } from 'react-native';
import { Button } from '../components/button';
import { Cart } from '../components/cart';
import { Categories } from '../components/categories';
import { Header } from '../components/header';
import { Menu } from '../components/menu';
import { TableModal } from '../components/table-modal';
import { useOrder } from '../context/order-context';

import { Empty } from '../components/icons/empty';
import { products as mockProducts } from '../mocks/products';
import type { Product } from '../types/product';

export const Main = () => {
  const isAndroid = Platform.OS === 'android';
  const statusbarHeight = isAndroid ? StatusBar.currentHeight : 0;
  const { table, addTable, clearTable } = useOrder();
  const [isTableModalVisible, setIsTableModalVisible] =
    useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

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
          {!isLoading ? (
            <>
              <View className="h-20 mt-9">
                <Categories />
              </View>

              {products.length > 0 ? (
                <View className="flex-1 mt-6">
                  <Menu isSelectedTable={!!table} products={products} />
                </View>
              ) : (
                <View className="items-center justify-center flex-1">
                  <Empty />
                  <Text className="text-lg text-gray-600/80">
                    Nenhum produto encontrado!
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View className="items-center justify-center flex-1">
              <ActivityIndicator className="text-red-600" size={'large'} />
            </View>
          )}
        </View>

        <View className="min-h-28 bg-white py-4 px-6">
          {!table && (
            <SafeAreaView>
              <Button onPress={handleOpenTableModal} disabled={isLoading}>
                Novo pedido
              </Button>
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
