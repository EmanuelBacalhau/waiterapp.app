import { useState } from 'react';
import { FlatList, Platform, Text, TouchableOpacity, View } from 'react-native';
import type { Category } from '../../types/category';

type Props = {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
};

export const Categories = ({ categories, onSelectCategory }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const isAndroid = Platform.OS === 'android';

  const handleSelectCategory = (categoryId: string) => {
    const selectedCategoryId =
      categoryId === selectedCategory ? '' : categoryId;

    setSelectedCategory(selectedCategoryId);
    onSelectCategory(selectedCategoryId);
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
              className={`bg-white rounded-full w-20 h-20 items-center justify-center shadow ${isAndroid ? 'shadow-black/70' : 'shadow-black/10'}`}
            >
              <Text className="text-2xl">{category.icon}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
