import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';

// Este componente exibe um item de usuário na lista de conversas. 
// Ele mostra a imagem do usuário, o nome e um link para a página de chat 
// correspondente ao usuário. O componente também inclui um divisor para 
// separar visualmente os itens na lista.


export default function UserItem({ userInfo }) {
  return (
    <Link href={'/chat?id=' + userInfo.docId}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: userInfo.imageUrl }}
        />
        <Text>{userInfo.name}</Text>
      </View>
      <View style={styles.divider}></View>
    </Link>
  );
}

const styles = {
  container: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  divider: {
    borderWidth: 0.2,
    marginVertical: 5,
    borderColor: Colors.PURPLE,
  },
};