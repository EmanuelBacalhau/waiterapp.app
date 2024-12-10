import './global.css';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  const [loaded] = useFonts({
    GeneralSans400: require('./src/assets/fonts/GeneralSans-Regular.otf'),
    GeneralSans700: require('./src/assets/fonts/GeneralSans-Bold.otf'),
    GeneralSans500: require('./src/assets/fonts/GeneralSans-Semibold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View className="items-center justify-center flex-1">
      <Text className="font-general-regular">
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
