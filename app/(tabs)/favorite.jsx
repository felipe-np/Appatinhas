import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from './../../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetListItem from '../../components/Home/PetListItem';
import { useFocusEffect } from '@react-navigation/native';

export default function Favorite() {

// Esta página exibe a lista de animais de estimação favoritos do usuário.
// Ela recupera os IDs dos animais favoritos do Firestore e, em seguida, busca
// os detalhes desses animais para exibi-los em uma lista. A lista é atualizada
// sempre que a tela ganha foco ou quando o usuário é alterado.

  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      GetFavPetIds();
    }
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        GetFavPetIds();
      }
    }, [user])
  );

  useEffect(() => {
    if (favIds.length > 0) {
      GetFavPetList();
    } else {
      setFavPetList([]); // Limpa a lista de pets se não há nenhum ID favorito
    }
  }, [favIds]);

  const GetFavPetIds = async () => {
    setLoading(true);
    try {
      const result = await Shared.GetFavList(user);
      setFavIds(result?.favorites || []);
    } catch (error) {
      console.error('Error fetching favorite IDs:', error);
    } finally {
      setLoading(false);
    }
  };

  const GetFavPetList = async () => {
    if (favIds.length === 0) {
      setFavPetList([]); // Limpa a lista de pets se não há nenhum ID favorito
      return;
    }

    setLoading(true);
    try {
      const q = query(collection(db, 'Pets'), where('id', 'in', favIds));
      const querySnapshot = await getDocs(q);
      const pets = [];
      querySnapshot.forEach((doc) => {
        pets.push(doc.data());
      });
      setFavPetList(pets);
    } catch (error) {
      console.error('Error fetching favorite pets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ padding: 10, marginTop: 10 }}>
      <Text style={{ fontFamily: 'quicksand-bold', fontSize: 20 }}>Favoritos</Text>
      <FlatList
        data={favPetList}
        numColumns={2}
        onRefresh={GetFavPetIds} // Função de atualização
        refreshing={loading}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} onUpdate={GetFavPetIds} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}