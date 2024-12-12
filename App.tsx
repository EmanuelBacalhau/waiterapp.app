import './global.css';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { OrderProvider } from './src/context/order-context';
import { Main } from './src/main';

export default function App() {
  const [loaded] = useFonts({
    GeneralSans400: require('./src/assets/fonts/GeneralSans-Regular.otf'),
    GeneralSans700: require('./src/assets/fonts/GeneralSans-Bold.otf'),
    GeneralSans600: require('./src/assets/fonts/GeneralSans-Semibold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <OrderProvider>
      <Main />
      <StatusBar style="dark" translucent backgroundColor="#fff" />
    </OrderProvider>
  );
}
