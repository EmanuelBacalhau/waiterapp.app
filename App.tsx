import './global.css';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
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
    <>
      <Main />
      <StatusBar style="dark" translucent backgroundColor="#fff" />
    </>
  );
}
