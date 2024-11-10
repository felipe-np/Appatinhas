import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'

// Este componente exibe uma seção "Sobre" para um animal de estimação. 
// Ele mostra uma breve descrição sobre o pet e permite que o usuário 
// expanda o texto para ler mais detalhes. O texto é inicialmente truncado 
// e pode ser expandido ao clicar no botão "Ler mais".


export default function AboutPet({pet}) {
    const [readMore,setReadMore]=useState(true);
  return (
    <View style={{
        padding: 20,
    }}>
      <Text style={{
        fontFamily: 'quicksand-bold',
        fontSize: 18,
      }}>Sobre {pet?.name}:</Text>
      <Text numberOfLines={readMore?3:20} style={{
        fontFamily: 'quicksand-medium',
        fontSize: 15,
        color: Colors.PURPLE,
        marginTop: 10,
      }}>{pet.about}</Text>
      {readMore&&
      <Pressable onPress={()=>setReadMore(false)}> 
      <Text style={{
        fontFamily: 'quicksand-medium',
        fontSize: 14,
        color: Colors.PINK,
      }}>Ler mais</Text>
      </Pressable>}
    </View>
  )
}