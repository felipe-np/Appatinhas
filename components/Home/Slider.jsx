import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import {collection, getDocs } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig'
import { FlatList } from 'react-native';

// Este componente exibe um slider de imagens. 
// Ele recupera as imagens do Firestore a partir da coleção 'Sliders' 
// e exibe essas imagens em um FlatList horizontal. 
// O componente é carregado quando a página é montada.


export default function Slider() {

    const [sliderList,setSliderList]=useState([]);
    useEffect(()=>{ 
        GetSliders();
    },[])   

    const GetSliders=async()=>{
        setSliderList([]);
        const snapshot=await getDocs(collection(db,'Sliders'));
        snapshot.forEach((doc)=>{
            console.log(doc.data());
            setSliderList(sliderList=>[...sliderList,doc.data()]);
        })
    }

  return (
    <View style={{
        marginTop: 15,
    }}>
      <FlatList
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
          <View>
              <Image source={{uri:item.imageUrl}}
                style={styles?.sliderImage}
              />
          </View>  
          
        )}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    sliderImage: {
        width: Dimensions.get('screen').width*0.95,
        height: 200,
        borderRadius: 15,
        marginRight: 15,
    }
})