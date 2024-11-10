import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import PetSubInfoCard from './PetSubInfoCard'

// Este componente exibe informações adicionais sobre um animal de estimação. 
// Ele mostra detalhes como idade, raça, sexo e peso do pet, 
// utilizando o componente PetSubInfoCard para cada informação. 
// As informações são organizadas em linhas para uma visualização clara e estruturada.


export default function PetSubInfo({pet}) {
  return (
    <View style ={{
        paddingHorizontal: 20,
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <PetSubInfoCard
            icon={require('./../../assets/images/calendar.png')}
            title={'Idade:'}
            value={pet?.age}
        />
        <PetSubInfoCard 
            icon={require('./../../assets/images/bone.png')}
            title={'Raça'}
            value={pet?.breed}
        />
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
        <PetSubInfoCard
            icon={require('./../../assets/images/sex.png')}
            title={'Sexo:'}
            value={pet?.sex}
        />
        <PetSubInfoCard 
            icon={require('./../../assets/images/weight.png')}
            title={'Peso'}
            value={pet?.weight +'Kg'}
        />
      </View>
    </View>
  )
}