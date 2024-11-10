import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, QuerySnapshot, where } from 'firebase/firestore'
import { db } from './../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo';
import UserItem from '../../components/Inbox/UserItem';

export default function Inbox() {

// Esta página exibe a lista de conversas do usuário na caixa de entrada. 
// Ela recupera as conversas do Firestore com base no e-mail do usuário 
// e exibe os detalhes de cada conversa, filtrando o outro usuário envolvido na conversa.


  const {user} = useUser();
  const [userList,setUserList]=useState([]);
  const[loader,setLoader]=useState(false);

  useEffect(() => {
      user&&GetUserList();
    }, [user]);

  // Recuperar o usuariáo dependendendo no  usário do e-mail e filtrar o outro usuário

  const GetUserList=async()=>{
    setLoader(true);
    setUserList([]);
    const q=query(collection(db,'Chat'),
    where('userIds','array-contains',user?.primaryEmailAddress?.emailAddress))
    
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
      setUserList(prevList=>[...prevList,doc.data()])
    })
    setLoader(false);
  }

  const MapOtherUserList=()=>{
    const list=[];
    userList.forEach((record)=>{
      const otherUser = record.users?.filter(user => user?.email !== user?.primaryEmailAddress?.emailAddress)
      const result ={
        docId:record.id,
        ...otherUser[0]
      }
      list.push(result)
    })

    return list;
  }

  return (
    <View style={{
      padding: 10,
      marginTop: 10
    }}>
      <Text style={{
        fontFamily:'quicksand-bold',
        fontSize: 20
      }}>Inbox</Text>

      <FlatList
        data={MapOtherUserList()}
        refreshing={loader}
        onRefresh={GetUserList}
        style={{
          marginTop:15,
          
        }}
        renderItem={({item,index})=>(
          <UserItem userInfo={item} key={index}/>
          )}
      />
    </View>
  )
}


