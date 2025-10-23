import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStateProvider, useAppState } from './src/context/AppStateContext';
import { Provider as AuthProvider } from './src/context/AuthContext';
import LoginFlow from './src/routes/LoginFlow';
import MainFlow from './src/routes/MainFlow';

const RootNavigator = () => {
  const { isSignedIn, isOTPVerified } = useAppState();

  return isSignedIn && isOTPVerified ? <MainFlow /> : <LoginFlow />;
};

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthProvider>
            <AppStateProvider>
              <RootNavigator />
              <FlashMessage position="top" />
            </AppStateProvider>
          </AuthProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
