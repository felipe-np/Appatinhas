import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

// Este componente exibe uma informação específica sobre um animal de estimação. 
// Ele mostra um ícone, um título e um valor, organizados em uma linha. 
// O componente é estilizado para ter um fundo branco, bordas arredondadas e espaçamento adequado entre os elementos.


export default function PetSubInfoCard({icon,title,value}) {
  return (
      <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:Colors.WHITE,
            padding:10,
            margin:5,
            borderRadius:8,
            gap:10,
            flex:1
        }}>
            <Image
            style={{
                width: 30,
                height: 30,
            }}
            source={icon}/> 
            <View style={{
                flex: 1
            }} >
                <Text style={{
                    fontFamily:'quicksand-bold',
                    fontSize: 16,
                    color:Colors.PURPLE
                }}>{title}</Text>
                <Text style={{
                    fontFamily:'quicksand',
                    fontSize: 20,
                    color:Colors.PURPLE
                }}>{value}</Text>
            </View>
        </View>

  )
}