import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Button } from '../components/button';
import { Cart } from '../components/cart';
import { Categories } from '../components/categories';
import { Header } from '../components/header';
import { Empty } from '../components/icons/empty';
import { Menu } from '../components/menu';
import { TableModal } from '../components/table-modal';
import { useOrder } from '../context/order-context';
import type { Category } from '../types/category';
import type { Product } from '../types/product';
import { api } from '../utils/api';

export const Main = () => {
  const isAndroid = Platform.OS === 'android';
  const statusbarHeight = isAndroid ? StatusBar.currentHeight : 0;
  const { table, addTable, clearTable } = useOrder();
  const [isTableModalVisible, setIsTableModalVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingByCategory, setIsLoadingCategory] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [categoriesResponse, productsResponse] = await Promise.all([
        api.get('/categories'),
        api.get('/products'),
      ]);

      const categories = categoriesResponse.data;
      const products = productsResponse.data;

      setCategories(categories);
      setProducts(products);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;

    setIsLoadingCategory(true);
    const { data } = await api.get(`${route}`);
    setProducts(data);
    setIsLoadingCategory(false);
  }

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
              <View className="h-28 mt-9">
                <Categories
                  onSelectCategory={handleSelectCategory}
                  categories={categories}
                />
              </View>

              {products.length > 0 ? (
                <>
                  {isLoadingByCategory ? (
                    <View className="items-center justify-center flex-1">
                      <ActivityIndicator
                        className="text-red-600"
                        size={'large'}
                      />
                    </View>
                  ) : (
                    <View className="flex-1 mt-2">
                      <Menu isSelectedTable={!!table} products={products} />
                    </View>
                  )}
                </>
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
