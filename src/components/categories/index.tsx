import { useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import { categories } from '../../mocks/categories';

export const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const isAndroid = Platform.OS === 'android';

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
  };

  return (
    <FlatList
      data={categories}
      horizontal
      contentContainerStyle={{ paddingLeft: 6 }}
      keyExtractor={category => category._id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            className={`items-center gap-1 mr-4 ${isSelected ? 'opacity-100' : 'opacity-50'}`}
            onPress={() => {
              handleSelectCategory(category._id);
            }}
          >
            <View
              className={`bg-white rounded-full w-14 h-14 items-center justify-center shadow ${isAndroid ? 'shadow-black/70' : 'shadow-black/10'}`}
            >
              <Text className="text-2xl">{category.icon}</Text>
            </View>

            <Text className="text-base font-general-semibold text-center">
              {category.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
