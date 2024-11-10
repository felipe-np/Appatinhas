import { View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRootNavigationState, Redirect } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import Colors from './../constants/Colors';

// Esta página configura o layout raiz do aplicativo. 
// Ela utiliza o ClerkProvider para gerenciar a autenticação do usuário 
// e o SecureStore para armazenar tokens de forma segura. 
// A página também carrega fontes personalizadas usando o hook useFonts do Expo 
// e define a navegação principal do aplicativo usando o Stack do expo-router.


export default function Index() {
  const { user, isLoaded } = useUser();
  const rootNavigationState = useRootNavigationState();
  const navigation = useNavigation();

  useEffect(() => {
    CheckNavLoaded();
  }, [rootNavigationState]);

  const CheckNavLoaded = () => {
    if (!rootNavigationState || !rootNavigationState.key) {
      return null;
    }
  };

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? (
        <Redirect href={'/(tabs)/home'} />
      ) : (
        <Redirect href={'/login'} />
      )}
    </View>
  );
}