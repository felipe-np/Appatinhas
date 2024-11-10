import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

// Esta página configura o layout raiz do aplicativo. 
// Ela utiliza o ClerkProvider para gerenciar a autenticação do usuário 
// e o SecureStore para armazenar tokens de forma segura. 
// A página também carrega fontes personalizadas usando o hook useFonts do Expo.


const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function RootLayout() {

  
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

   useFonts({
    'quicksand': require('./../assets/fonts/Quicksand-Regular.ttf'),
    'quicksand-medium': require('./../assets/fonts/Quicksand-Medium.ttf'),
    'quicksand-bold': require('./../assets/fonts/Quicksand-Bold.ttf'),
});


  return (
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey={publishableKey}>
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="login/index" 
      options={{
        headerShown: false
      }}
      />
    </Stack>
    </ClerkProvider>
  );
}
