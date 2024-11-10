import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import {useRouter} from 'expo-router';
import { TouchableOpacity } from 'react-native';
import MarkFavoriteFav from '../MarkFav';

// Este componente exibe um item de lista de animais de estimação. 
// Ele mostra a imagem do pet, o nome, a raça, a idade e um botão para marcar como favorito. 
// Quando o usuário clica no item, ele é redirecionado para a página de detalhes do pet.


export default function PetListItem({pet}) {
    const router=useRouter();
  return (
    <TouchableOpacity 
    onPress={() => router.push({
        pathname: '/pet-details',
        params:pet
    })}
    style={{
        padding: 10,
        margin: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
    }}>
      <View style={{
        position: 'absolute',
        zIndex: 10,
        right:10,
        top:10,
      }}>
        <MarkFavoriteFav pet={pet} color={Colors.PURPLE}/>
      </View>
      <Image style={{
        width: 140,
        height: 150,
        borderRadius: 10,
        objectFit: 'cover',}}
      source={{uri:pet?.imageUrl}}/>
      <Text style={{
        fontFamily: 'quicksand-bold',
        fontSize: 16,
        color: Colors.PURPLE,
        textAlign: 'center',
        paddingVertical: 5,
      }}>{pet?.name}</Text>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
      }}>
        <Text style={{
            fontFamily: 'quicksand-medium',
            color: Colors.PURPLE,
            fontSize: 10,
        }} >{pet?.breed}</Text>  
        <Text style={{
            fontFamily: 'quicksand-bold',
            color: Colors.PURPLE,
            backgroundColor: Colors.LIGHT_PRIMARY,
            borderRadius: 10,
            backgroundColor: Colors.LIGHT_PRIMARY,
            paddingHorizontal: 7,
            fontSize: 10,
        }} > Idade: {pet?.age}</Text>
      </View>       
      
    </TouchableOpacity>
  )
}