import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {collection, getDocs} from 'firebase/firestore'
import {db} from './../../config/FirebaseConfig'
import Colors from './../../constants/Colors'
import { TouchableOpacity } from 'react-native'

// Esta página exibe uma lista de categorias de animais de estimação. 
// Ela recupera as categorias do Firestore e exibe cada categoria em uma lista. 
// O usuário pode selecionar uma categoria, que será destacada visualmente.
// A categoria selecionada é passada para o componente pai usando a função de retorno de chamada category.

export default function Category({category}) {

    
    const [categorylist,setCategoryList]=useState([]);
    const [selectedCategory,setSelectedCategory]=useState('Dogs');
    useEffect(()=>{
        GetCategorias();
    },[]);
  /**   Usado para pegar categoria */
  const GetCategorias=async()=>{
    setCategoryList([]);
    const snapshot=await getDocs(collection(db,'Category'));
    snapshot.forEach((doc)=>{
      setCategoryList(categorylist=>[...categorylist,doc.data()]);
    });
}
  
    return (
    <View style={{
        marginTop: 20,
    }}>
      <Text style={{
        fontFamily: 'quicksand-medium',
        fontSize: 18,
      }}>Categorias</Text>

      <FlatList
      data={categorylist}
      numColumns={3}
      renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>{
            setSelectedCategory(item.name)
            category(item.name)
        }}
        style={{
            flex:1,
        }}> 
            <View style={[styles.conatiner,
                selectedCategory===item.name&&styles.selectedCategoryContainer
            ]}> 
                <Image source={{uri:item?.imageUrl}}
                style={{
                    width:40,
                    height:40,
                }}
                ></Image>
            </View>
            <Text style={{
                textAlign:'center',
                fontFamily: 'quicksand',
                fontSize: 14,
            }}>{item?.name}</Text>
        </TouchableOpacity> 
        )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    conatiner:{
        backgroundColor:Colors.LIGHT_PRIMARY,
        padding:10,
        alignItems:'center',
        borderWidth:1,
        borderRadius:99,
        borderColor:Colors.LIGHT_PRIMARY,
        margin:5,
    },
    selectedCategoryContainer:{
        backgroundColor:Colors.PURPLE,
        borderColor:Colors.PURPLE,
    }
})