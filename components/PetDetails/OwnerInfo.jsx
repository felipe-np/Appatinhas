import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

// Este componente exibe as informações do dono do animal de estimação. 
// Ele mostra a imagem do dono, o nome do dono e um ícone de envio. 
// As informações são estilizadas e organizadas em uma linha com espaço entre os elementos.


export default function OwnerInfo({pet}) {
  return (
    <View style={styles.container}>
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap:20,
    }}>
      <Image source={{uri:pet?.userImage}}
      style={{
        width:40,
        height:40,
        borderRadius:99,
      }}/>
      <View>
        <Text style={{
            fontFamily: 'quicksand-medium',
            fontSize: 18,
        }}>{pet?.username}</Text>
        <Text style={{
            fontFamily: 'quicksand',
            fontSize:12
        }}>Tutor</Text>
      </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={Colors.PINK} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 15,
        backgroundColor:Colors.WHITE,
        justifyContent: 'space-between',
        borderColor:Colors.LIGHT_PRIMARY
    }
})