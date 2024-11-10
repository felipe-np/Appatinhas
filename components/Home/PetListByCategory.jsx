import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from './../../config/FirebaseConfig'
import { useState } from 'react'
import PetListItem from './PetListItem'

// Esta página exibe uma lista de animais de estimação filtrados por categoria. 
// Ela permite que o usuário selecione uma categoria e exibe os animais de estimação 
// correspondentes recuperados do Firestore. A lista de animais é atualizada 
// sempre que uma nova categoria é selecionada ou quando a lista é atualizada manualmente.


export default function PetListByCategory() {

  const [petList,setPetList]=useState([]);
  const [loader,setLoader]=useState(false);
  useEffect(()=>{
    GetPetList('Dogs');
  },[]);

//   /**   Usado para pegar lista de pets na categoria selecionada */
  
  const GetPetList=async(category)=>{
    setLoader(true);
    setPetList([]);
    const q=query(collection(db,'Pets'),where('category','==',category));
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
      setPetList(petList=>[...petList,doc.data()]);
    });
    setLoader(false);
  }


  return (
    <View>
      <Category category={(value)=>GetPetList(value)}/>
        <FlatList 
        style={{marginTop:20}}
        data={petList}
        horizontal={true}
        refreshing={loader}
        onRefresh={()=>GetPetList('Dogs')}
        renderItem={({item,index})=>(
          <PetListItem pet={item}/>)}
        />
    </View>
  )
}