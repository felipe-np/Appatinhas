import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

export default function Home() {
  return (
    <View style={{
      padding: 20,
      marginTop: 50
    }}>
      
      {/* Header */}
        <Header/>
      {/* Slider */}
        <Slider/>
      {/* Categorias */}
        <PetListByCategory/>
      {/* List of Pets */}

      {/* Add new Pet Option */}
      <Link href={'/add-new-pet'} style={styles?.addNewPetContainer}>
      <MaterialIcons name="pets" size={24} color={Colors.PURPLE} />
        <Text style={{
          fontFamily: 'quicksand-bold',
          color: Colors.PURPLE,
          fontSize: 18,
        }}>Adicionar Novo Pet</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display: 'flex',
        flexDirection: 'row',
        gap:10,
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        textAlign: 'center',
        backgroundColor: Colors.LIGHT_PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 10,
        justifyContent: 'center',
  }
})