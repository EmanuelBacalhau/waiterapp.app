import { FlatList, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Platform } from 'react-native';
import { Categories } from '../components/categories';
import { Header } from '../components/header';

export const Main = () => {
  const isAndroid = Platform.OS === 'android';
  const statusbarHeight = isAndroid ? StatusBar.currentHeight : 0;

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

          <View className="flex-1">
            <Text>itens</Text>
          </View>
        </View>

        <View className="min-h-28 bg-white">
          <Text>fotter</Text>
        </View>
      </SafeAreaView>
    </>
  );
};
