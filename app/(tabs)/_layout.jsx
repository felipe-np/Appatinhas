import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function TabLayout() {
  return (
   
// Definições das abas de navegação do app.

    <Tabs
    screenOptions={{
        tabBarActiveTintColor: Colors.PURPLE,
    }}
    >
        <Tabs.Screen name='home'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon:({color})=><Ionicons name="home" size={24} color={Colors.PINK} />
            }}
        />
        <Tabs.Screen name='favorite'
            options={{
                title: 'Favoritos',
                headerShown: false,
                tabBarIcon:({color})=><Ionicons name="heart-circle" size={24} color={Colors.PINK} />
            }}
        />
        <Tabs.Screen name='inbox'
            options={{
                title: 'Inbox',
                headerShown: false,
                tabBarIcon:({color})=><Ionicons name="chatbubbles" size={24} color={Colors.PINK} />
            }}
        />
        <Tabs.Screen name='profile'
            options={{
                title: 'Perfil',
                headerShown: false,
                tabBarIcon:({color})=><Ionicons name="person" size={24} color={Colors.PINK} />
            }}
        />
    </Tabs>

  )
}