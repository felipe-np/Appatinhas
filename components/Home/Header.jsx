import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

// Este componente exibe o cabeçalho da aplicação. 
// Ele mostra uma mensagem de boas-vindas, o nome completo do usuário 
// e a imagem de perfil do usuário, recuperados do Clerk.


export default function Header() {

    const {user}=useUser();

  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}>
        <View>
            <Text style={{
                fontFamily: 'quicksand',
                fontSize: 14,
            }}>Olá, adotar é amor!</Text>
            <Text style={{
                fontFamily: 'quicksand-medium',
                fontSize:18
            }}>{user?.fullName}</Text>
        </View> 
        <Image source={{uri:user?.imageUrl}} 
        style={{
            width:30,
            height:30,
            borderRadius:99
        }}
        />
    </View>
  )
}