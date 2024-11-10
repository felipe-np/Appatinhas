import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import {db} from '../../config/FirebaseConfig';
import {collection, query, where, getDocs, deleteDoc, doc} from 'firebase/firestore';
import PetListItem from './../../components/Home/PetListItem';
import Colors from '../../constants/Colors';

// Esta página exibe as postagens de animais de estimação do usuário. 
// Ela recupera as postagens do Firestore com base no e-mail do usuário 
// e exibe os detalhes de cada postagem em uma lista. 
// O usuário também pode deletar suas postagens.


export default function userPost() {
    const navigation =useNavigation();
    const {user}=useUser();
    const [userPostList,setUserPostList]=useState([]);
    const [loader,setLoader]=useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Postagens'
    })
    user&&getUserPost();
},[user]);


// Função para pegar os posts do usuário
    const getUserPost=async()=>{
      setLoader(true);
      setUserPostList([]);
        const q=query(collection(db,'Pets'),
        where('email','==',user?.primaryEmailAddress?.emailAddress));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setUserPostList(prev=>[...prev,doc.data()])
        })
        setLoader(false);
    }

    const OnDeletePost=(docId)=>{
      Alert.alert('Excluir Postagem','Tem certeza que deseja excluir essa postagem?',[
        {
          text:'Sim',
          onPress:()=>deletePost(docId)
        },
        {
          text:'Cancelar',
          style:'cancel'
        }
      ])
      
    }

    const deletePost=async(docId)=>{
      await deleteDoc(doc(db,'Pets',docId));
      getUserPost();
    }

  return (
    <View style={{
        padding: 10,
    }}>
      <Text style={{
        fontSize:20,
        fontFamily:'quicksand-medium'
      }}>Minhas Postagens</Text>

      <FlatList
        data={userPostList}
        numColumns={2}
        refreshing={loader}
        onRefresh={getUserPost}
        renderItem={({item,index})=>(
            <View>
            <PetListItem pet={item} key={index}/>
            <Pressable
            onPress={()=>OnDeletePost(item?.id)}
            style={styles.deleteButton}>
                <Text style={{
                  fontFamily:'quicksand',
                  textAlign:'center'
                }}>Excluir</Text>
                </Pressable>
            </View>
        )}
      />

        {userPostList?.length==0 &&<Text>Nenhuma postagem encontrada</Text>}

    </View>
  )
}

const styles = StyleSheet.create({
    deleteButton:{
        backgroundColor:Colors.LIGHT_PRIMARY,
        padding:5,
        borderRadius:5,
        marginTop:5,
        marginRight:5
    }
})