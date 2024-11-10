import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth, useUser } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useNavigation, CommonActions } from '@react-navigation/native';

// Esta página exibe a tela de login do aplicativo. 
// Ela utiliza o OAuth do Google para autenticar o usuário. 
// Se o usuário já estiver autenticado, ele é redirecionado para a tela principal do aplicativo. 
// A página também aquece o navegador da Web para melhorar a experiência do usuário ao iniciar o fluxo OAuth.


export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const { user, isLoaded } = useUser();
    const navigation = useNavigation();

    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

    useEffect(() => {
        if (isLoaded && user) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: '(tabs)/home' }],
                })
            );
        }
    }, [isLoaded, user, navigation]);

    const onPress = useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
            });

            if (createdSessionId) {
                //  Verificar  sessão criada
            } else {
                // Usar signIn ou signUp para próximas etapas, como MFA
            }
        } catch (err) {
            console.error('OAuth error:', err);
        }
    }, [startOAuthFlow]);

    if (!isLoaded) {
        return <ActivityIndicator size="large" color={Colors.PRIMARY} />; // Mostrar um indicador de carregamento enquanto verifica o status de autenticação
    }

    return (
        <View style={{ backgroundColor: Colors.WHITE, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Pressable onPress={onPress} style={{ padding: 10, backgroundColor: Colors.PURPLE, borderRadius: 5 }}>
                <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily:'quicksand-bold' }}>Conecte-se com sua conta Google Clique Aqui!</Text>
            </Pressable>
        </View>
    );
}