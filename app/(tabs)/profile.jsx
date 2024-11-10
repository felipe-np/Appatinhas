import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth, useUser } from '@clerk/clerk-expo'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function Profile() {

// Esta página exibe o perfil do usuário, incluindo uma lista de opções de menu
// que permitem ao usuário navegar para diferentes partes do aplicativo, como
// adicionar um novo pet, ver postagens, favoritos e a caixa de entrada.

  const Menu=[
    {
      id:1,
      name:'Adicionar Pet',
      icon:'add-circle',
      path:'/add-new-pet'
    },
    {
      id:2,
      name:'Postagens',
      icon:'bookmark',
      path:'/user-post'
    },
    {
      id:3,
      name:'Favoritos',
      icon:'heart',
      path:'/(tabs)/favorite'
    },
    {
      id:4,
      name:'Inbox',
      icon:'chatbubble-ellipses',
      path:'/(tabs)/inbox'
    },
    {
      id:5,
      name:'Sair',
      icon:'exit',
      path:'logout'
    }
  ]
  const {user}=useUser();
  const router=useRouter();
  const {signOut}=useAuth();

  const onPressMenu = async (menu) => {
    if (menu.path === 'logout') {
      await signOut();
      router.replace('/login'); // Redirecionar para a tela de login
      return;
    }
    router.push(menu.path);
  };
  return (
    <View style={{
      padding: 10,
      marginTop: 10,
    }}> 
      <Text style={{
        fontSize:20,
        fontFamily:'quicksand-bold'
      }}>Profile</Text>

      <View style={{
        display:'flex',
        alignItems:'center',
        marginVertical:10
      }}>
        <Image
          source={{uri:user?.imageUrl}}
          style={{
            width:50,
            height:50,
            borderradius:99,
          }}
        />

        <Text style={{
          fontFamily:'quicksand-bold',
          fontSize:20,
          marginTop:10
        }}>{user?.fullName}</Text>
        <Text style={{
          fontFamily:'quicksand-medium',
          fontSize:14,
          color:Colors.PURPLE
        }}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

        <FlatList
          data={Menu}
          renderItem={({item,index})=>(
          <TouchableOpacity 
          onPress={()=>onPressMenu(item)}
          key={item.id}
          style={{
            marginVertical:10,
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            backgroundColor:Colors.WHITE,
            padding:10,
            borderRadius:10,
          }}>
            <Ionicons name={item?.icon} size={30} color={Colors.PURPLE}
            style={{
              padding:10,
              backgroundColor:Colors.LIGHT_PRIMARY,
              borderradius:10,
            }} />
            <Text style={{
              fontFamily:'quicksand-medium',
              fontSize:18
            }}>{item.name}</Text>
          </TouchableOpacity>
        )}
       />

    </View>
  )
}