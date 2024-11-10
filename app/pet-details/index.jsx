import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';
import AboutPet from '../../components/PetDetails/AboutPet';
import OwnerInfo from '../../components/PetDetails/OwnerInfo';
import Colors from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';

// Esta página exibe os detalhes de um animal de estimação específico. 
// Ela inclui informações sobre o pet, como idade, raça, sexo, peso, 
// uma descrição sobre o pet e detalhes do dono. 
// A página também permite que o usuário inicie um chat com o dono do pet 
// clicando no botão "Me adote!".


export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: ''
    });
  }, []);

  const InitiateChat = async () => {
    if (!user?.primaryEmailAddress?.emailAddress || !pet?.email) {
      console.error('User email or pet email is undefined');
      return;
    }

    const docId1 = user.primaryEmailAddress.emailAddress + '_' + pet.email;
    const docId2 = pet.email + '_' + user.primaryEmailAddress.emailAddress;

    console.log('docId1:', docId1);
    console.log('docId2:', docId2);

    const q = query(collection(db, 'Chat'), where('id', 'in', [docId1, docId2]));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No matching documents. Creating a new chat document.');
      await setDoc(doc(db, 'Chat', docId1), {
        id: docId1,
        users: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName
          },
          {
            email: pet?.email,
            imageUrl: pet?.userImage,
            name: pet?.username
          }
        ],
        userIds:[user?.primaryEmailAddress?.emailAddress,pet?.email]
      });
      router.push({
        pathname: '/chat',
        params: { id: docId1 }
      });
    } else {
      querySnapshot.forEach(doc => {
        console.log('Document data:', doc.data());
        router.push({
          pathname: '/chat',
          params: { id: doc.id }
        });
      });
    }
  };

  return (
    <View>
      <ScrollView>
        {/* Pet Info */}
        <PetInfo pet={pet} />
        {/* Pet SubInfo */}
        <PetSubInfo pet={pet} />
        {/* Sobre */}
        <AboutPet pet={pet} />
        {/* detalhes do dono */}
        <OwnerInfo pet={pet} />

        <View style={{ height: 80 }}></View>
      </ScrollView>
      {/* botao adocao */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.adoptBtn} onPress={InitiateChat}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'quicksand-bold',
              fontSize: 18,
              color: Colors.WHITE
            }}
          >
            Me adote!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adoptBtn: {
    padding: 15,
    backgroundColor: Colors.PURPLE
  },
  bottomContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  }
});