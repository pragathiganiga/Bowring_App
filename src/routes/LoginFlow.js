import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginFlow/LoginScreen/LoginScreen';
import OTPVerificationScreen from '../screens/LoginFlow/OTPVerificationScreen/OTPVerificationScreen';

const Stack = createStackNavigator();

function LoginFlow() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        animationDuration: 250,
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="OTPVerificationScreen"
        component={OTPVerificationScreen}
      />
    </Stack.Navigator>
  );
}

export default LoginFlow;
