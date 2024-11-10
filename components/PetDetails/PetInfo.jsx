import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import MarkFavorite from '../MarkFav';

// Este componente exibe as informações principais de um animal de estimação. 
// Ele mostra a imagem do pet, o nome, o endereço e um botão para marcar como favorito. 
// As informações são estilizadas e organizadas em uma visualização agradável.
// O botão de favorito é um componente separado

export default function PetInfo({pet}) {
  return (
    <View>
      <Image source={{uri:pet.imageUrl}}
      style={{
        width: '100%',
        height: 350,
        objectFit: 'cover',
      }}
      />
      <View style={{
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <View>
        <Text style={{
            fontFamily: 'quicksand-bold',
            fontSize: 24,
        }}>{pet?.name}</Text>

        <Text style={{
            fontFamily: 'quicksand',
            color:Colors.PURPLE
        }}>{pet?.address}</Text>
        </View>
        <MarkFavorite pet={pet}/>
      </View>
    </View>
  )
}