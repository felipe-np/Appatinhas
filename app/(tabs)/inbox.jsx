import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import UserItem from '../../components/Inbox/UserItem';
import Colors from '../../constants/Colors';

export default function Inbox() {
  // Esta página exibe a lista de conversas do usuário na caixa de entrada. 
  // Ela recupera as conversas do Firestore com base no e-mail do usuário 
  // e exibe os detalhes de cada conversa, filtrando o outro usuário envolvido na conversa.

  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetUserList();
    }
  }, [user]);

  // Recuperar o usuário dependendo do e-mail do usuário e filtrar o outro usuário
  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(collection(db, 'Chat'), where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setUserList((prevList) => [...prevList, doc.data()]);
    });
    setLoader(false);
  };

  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.find(u => u.email !== user?.primaryEmailAddress?.emailAddress);
      if (otherUser) {
        list.push({ ...otherUser, docId: record.id });
      }
    });
    return list;
  };

  const ItemSeparator = () => (
    <View style={{ height: 20 }} /> // Adjust the height to set the gap size
  );

  return (
    <View style={{ padding: 10, marginTop: 10 }}>
      <Text style={{ fontFamily: 'quicksand-bold', fontSize: 20 }}>Inbox</Text>

      {loader ? (
        <ActivityIndicator size="large" color={Colors.PURPLE} />
      ) : (
        <FlatList
          data={MapOtherUserList()}
          refreshing={loader}
          onRefresh={GetUserList}
          style={{ marginTop: 15, marginBottom: 15 }}
          renderItem={({ item, index }) => (
            <UserItem userInfo={item} key={index} style={{ marginTop: 15, marginBottom: 15, gap: 10, padding: 20 }} />
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      )}
    </View>
  );
}